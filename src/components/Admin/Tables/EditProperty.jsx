import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./EditProperty.css";

function EditProperty({ iD }) {
    console.log("iD prop in EditProperty:", iD);
    const [property, setProperty] = useState({
        propertyName:'',
        placeName: '',
        description: '',
        price: 0,
        parking: false,
        bedRooms: 0,
        image: null
    });

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/getPropertyById?iD=${iD}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property:', error);
            }
        };

        fetchProperty();
    }, [iD]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProperty(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setProperty(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', property.image);
            formData.append('propertyName', property.propertyName);
            formData.append('placeName', property.placeName);
            formData.append('description', property.description);
            formData.append('price', property.price);
            formData.append('parking', property.parking);
            formData.append('bedRooms', property.bedRooms);

            await axios.put(`http://127.0.0.1:5000/editProperty/${iD}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Property updated successfully');
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    return (
        <div>
            <h3>Edit Property</h3>
            <form onSubmit={handleSubmit}>
            <div>
                    <label htmlFor="propertyName">Property Name:</label>
                    <input type="text" id="propertyName" name="propertyName" value={property.propertyName} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="placeName">Name:</label>
                    <input type="text" id="placeName" name="placeName" value={property.placeName} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={property.description} onChange={handleInputChange}></textarea>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={property.price} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="parking">Parking:</label>
                    <input type="checkbox" id="parking" name="parking" checked={property.parking} onChange={() => setProperty(prevState => ({ ...prevState, parking: !prevState.parking }))} />
                </div>
                <div>
                    <label htmlFor="bedRooms">Bedrooms:</label>
                    <input type="number" id="bedRooms" name="bedRooms" value={property.bedRooms} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" onChange={handleImageChange} />
                </div>
                <br></br>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditProperty;
