import React, { useState } from 'react';
import './Profile.css'
import { useParams } from "react-router-dom";
import data from '../../FakeData/FakeData';
import Header from '../Header/Header';
import { Form } from 'react-bootstrap';
import { MyMap } from '../GoogleMap/MyMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [pick, setPick] = useState({
        from: '',
        to: ''
    });
    console.log(pick);
    const [btn, setBtn] = useState(true)

    const { riderName } = useParams();

    let rider;

    if (riderName) {
        rider = data.find(dt => dt.rideName === riderName);
    }
    else {
        rider = data.find(dt => dt.rideName === 'CAR');
    }

    const search = "bangladesh";
    const KEY = "IzU2Y04djRpUVpagLh1d";
    const URL = `https://api.maptiler.com/geocoding/[${search}].json?key=${KEY}`;

    const blurHandler = (e) => {
        const newPick = { ...pick }
        newPick[e.target.name] = e.target.value;
        setPick(newPick);
    }

    const searchHandler = (e) => {
        setBtn(false);
        console.log(btn);
        e.preventDefault();
    }

    return (
        <div className="container">
            <Header></Header>
            <hr />
            <div className="main-container row">
                <div className="col-lg-4 col-sm-12">
                    <div className="pick-form border">
                        {btn
                            ?
                            <Form className="mt-1">
                                <Form.Group controlId="pick-from">
                                    <Form.Label> <strong>Pick From</strong> </Form.Label>
                                    <Form.Control onBlur={blurHandler} required type="text" name="from" placeholder="From" />
                                </Form.Group>

                                <Form.Group controlId="pick-to">
                                    <Form.Label> <strong>Pick To</strong> </Form.Label>
                                    <Form.Control onBlur={blurHandler} required type="text" name="to" placeholder="To" />
                                </Form.Group>

                                <Form.Group controlId="pick-to">
                                    <button onClick={searchHandler} className="btn w-100 login-btn py-2 mt-4">Search</button>
                                </Form.Group>
                            </Form>
                            :
                            <div className="pick-result">
                                <div className="from-to">
                                    <h2> {pick.from} </h2>
                                    <h2> {pick.to} </h2>
                                </div>
                                <div className="card">
                                    <div className="card-details">
                                        <img src={rider.img} alt="" />
                                        <strong>{rider.rideName}</strong>
                                        <strong><FontAwesomeIcon icon={faUserFriends}/>{rider.person}</strong>
                                        <strong>{rider.price}</strong>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-details">
                                        <img src={rider.img} alt="" />
                                        <strong>{rider.rideName}</strong>
                                        <strong><FontAwesomeIcon icon={faUserFriends}/>{rider.person}</strong>
                                        <strong>{rider.price}</strong>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-details">
                                        <img src={rider.img} alt="" />
                                        <strong>{rider.rideName}</strong>
                                        <strong><FontAwesomeIcon icon={faUserFriends}/>{rider.person}</strong>
                                        <strong>{rider.price}</strong>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-lg-7 col-sm-12">
                    <MyMap></MyMap>
                </div>
            </div>
        </div>
    );
};

export default Profile;