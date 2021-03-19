import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './Home.css';
import data from '../../FakeData/FakeData';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    const [rider, setRider] = useState([]);
    useEffect(() => {
        setRider(data);
    }, [])
    return (
        <div className="home-container">
            <div className="container">
                <Header></Header>
                <div className="cardRow row position-relative">
                    {rider.map(ride => 
                        <Link to={`/${ride.rideName}`} className="card col mx-2" style={{ width: '18rem' }}>
                            <Card.Img className="p-4" variant="top" src={ride.img} />
                            <Card.Body>
                                <Card.Title className="text-center"> <Link to={`/${ride.rideName}`}> {ride.rideName} </Link> </Card.Title>
                            </Card.Body>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;