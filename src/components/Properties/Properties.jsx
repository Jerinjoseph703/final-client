import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { BallTriangle } from 'react-loader-spinner';
import './Properties.css';
import { useNavigate } from 'react-router-dom';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/getProperty?status=true');
      console.log("res:",response.data);
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
      // Handle error, e.g., display error message to the user
    }
  };

  const handleClick = (iD) => {
    // Make API request using place data
    axios.get(`http://127.0.0.1:5000/getPropertyById?iD=${iD}`)
        .then((res) => {
            console.log(' PackageName clicked:', res.data);
            // Navigate to the ShowDestination page with data
            navigate(`/showProperty?iD=${iD}`);
        })
        .catch((error) => {
            console.log('Error fetching data for PackageName:', error);
        });
};

  return (
    <div>
      <div className="cardcover1">
      {loading ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BallTriangle
            height={90}
            width={90}
            radius={5}
            color="#322502"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        properties.map(property => (
          <div className="card_cover" key={property._id}>
            <Card className="property-card" sx={{ minWidth: 275 }}>
              <CardContent key={`content-${property._id}`} className="property-content">
                <img className="property-image" src={`data:image/png;base64,${Buffer.from(property.image.data).toString('base64')}`} alt="Property" />
                <div className="property-info">
                  <h3>{property.propertyName}</h3>
                  <CardActions className='action'>
                   <Button size="small" onClick={() => handleClick(property.iD)}>View More</Button>
                  </CardActions>
                </div>
              </CardContent>
            </Card>
          </div>
        ))
        
        )}
    </div>
    </div>

  );
}

export default Properties;
