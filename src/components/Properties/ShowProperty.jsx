import React, { useEffect, useState } from 'react';
import './ShowProperty.css';
import { Button, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';
import { BallTriangle } from 'react-loader-spinner';

const ShowProperty = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const iD = queryParams.get('iD');

    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const res = await axios.post('http://127.0.0.1:5000/addBookings', {
                iD: iD,
                customerName,
                email,
                phoneNo
            });
            console.log('Booking Details submitted', res.data);

        } catch (error) {
            console.error('Error during booking', error);
        }
    };

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/getPropertyById?iD=${iD}`)
          .then((res) => {
            console.log('Package Details:', res.data);
            setDetails(res.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log('Error fetching Package details:', error);
            setLoading(false);
          });
      }, [iD]);
    

    return (
        <div>
            <div className="body_cover">
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
            <>
                <div className="property_img_details">
                    {details && (
                        <div
                            className="property_img"
                            style={{
                                backgroundImage: `url(data:image/png;base64,${Buffer.from(details.image.data).toString('base64')})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        ></div>
                    )}
                    <div className="property_details">
                        {details && (
                            <div className='details'>
                                <div className="propertyName">{details.propertyName}</div>
                                <div className="placeName">{details.placeName}</div>
                                <div className="price">{details.price} /-</div>
                                <div className="description">{details.description}</div>
                                <div className="parking">Parking:{details.parking ? "Yes" : "No"}</div>
                                <div className="bedRooms">BedRooms:{details.bedRooms}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="property_booking">
                    <div className="booking_fields">
                        <div className="head_cover">
                            <div className="head">
                                Book Here
                            </div>
                        </div>
                        <div className="text_fields">
                            <TextField
                                style={{ width: '80%' }}
                                id="outlined-basic"
                                label="CustomerName"
                                variant="outlined"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                            <TextField
                                style={{ width: '80%' }}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                style={{ width: '80%' }}
                                id="outlined-basic"
                                label="PhonNo"
                                variant="outlined"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                disableElevation
                                onClick={handleSubmit}
                                >
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
                </>
                                )}
            </div>
        </div>
    );
};

export default ShowProperty;
