import React from 'react';
import './Profile.css'
import { useParams } from "react-router-dom";
import data from '../../FakeData/FakeData';
import Header from '../Header/Header';
import { Form } from 'react-bootstrap';

const Profile = () => {
    const { riderName } = useParams();
    const rider = data.find(dt => dt.rideName === riderName);
    return (
        <div className="container">
            <Header></Header>
            <hr />
            <div className="main-container row">
                <div className="col-4">
                    <div className="pick-form border">
                    <Form className="mt-1">
                        <Form.Group controlId="pick-from">
                            <Form.Label> <strong>Pick From</strong> </Form.Label>
                            <Form.Control type="text" placeholder="From" />
                        </Form.Group>

                        <Form.Group controlId="pick-to">
                            <Form.Label> <strong>Pick To</strong> </Form.Label>
                            <Form.Control type="text" placeholder="To" />
                        </Form.Group>

                        <Form.Group controlId="pick-to">
                            <button className="btn w-100 login-btn py-2 mt-4">Search</button>
                        </Form.Group>
                    </Form>
                    </div>
                </div>
                <div className="pick-map border col-7">
                    
                </div>
            </div>
        </div>
    );
};

export default Profile;