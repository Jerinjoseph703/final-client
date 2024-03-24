import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'antd';
import EditProperty from '../Tables/EditProperty';
import { Buffer } from 'buffer';
import "./Property.css";

function PropertyTable() {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [propertyData, setPropertyData] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = async (property) => {
    try {
      const propertyData = await fetchPropertyById(property.iD);
      setPropertyData(propertyData);
      setSelectedPropertyId(property.iD);
      setShowModal(true);
    } catch (error) {
      console.error('Error opening edit modal:', error);
    }
  };

  const fetchPropertyById = async (iD) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/getPropertyById?iD=${iD}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching property by ID:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/getProperty');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const buttonStatus = (id, currentStatus) => {
    const newStatus = !currentStatus;
    axios.put('http://127.0.0.1:5000/status', { _id: id, status: newStatus })
      .then((response) => {
        setProperties(prevProperties => prevProperties.map(property => {
          if (property._id === id) {
            return { ...property, status: response.data.status };
          }
          return property;
        }));
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  return (
    <div className="property-table-container">
      <h2>Property List</h2>
      <div className="table_content">
        <table className="property-table">
          <thead>
            <tr>
              <th>iD</th>
              <th>PropertyName</th>
              <th>Place</th>
              <th>Description</th>
              <th>Price</th>
              <th>Parking</th>
              <th>Bedroom</th>
              <th>Image</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property._id}>
                <td>{property.iD}</td>
                <td>{property.propertyName}</td>
                <td>{property.placeName}</td>
                <td>{property.description}</td>
                <td>{property.price}</td>
                <td>{property.parking ? 'Yes' : 'No'}</td>
                <td>{property.bedRooms}</td>
                <td>
                  {property.image && property.image.data && (
                    <div style={{
                      backgroundImage: `url(data:image/png;base64,${Buffer.from(property.image.data).toString('base64')})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      width: "100px",
                      height: "100px"
                    }}></div>
                  )}
                </td>
                <td>
                  <button onClick={() => buttonStatus(property._id, property.status)} style={{
                    background: "#CBD5C0",
                    width: "100px",
                    height: "30px"
                  }}>
                    {property.status ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td>
                  <Button variant="primary" onClick={() => handleOpenModal(property)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title='Edit Property'
        visible={showModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        {propertyData && <EditProperty iD={selectedPropertyId} property={propertyData} />}
      </Modal>
    </div>
  );
}

export default PropertyTable;
