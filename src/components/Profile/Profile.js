import React, { useState, useEffect } from 'react';
import './Profile.css'
import { useParams } from "react-router-dom";
import data from '../../FakeData/FakeData';
import Header from '../Header/Header';
import { Form } from 'react-bootstrap';
import { MyMap } from '../GoogleMap/MyMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [from, setFrom] = useState([]);
    const [to, setTo] = useState([]);
    const [pick, setPick] = useState({
        from: '',
        to: ''
    });
    const [btn, setBtn] = useState(true)
    const { riderName } = useParams();

    let rider;

    if (riderName) {
        rider = data.find(dt => dt.rideName === riderName);
    }
    else {
        rider = data.find(dt => dt.rideName === 'CAR');
    }

    const blurHandler = (e) => {
        const newPick = { ...pick }
        newPick[e.target.name] = e.target.value;
        setPick(newPick);
    }

    const FROM = pick.from ? pick.from : 'dhaka';
    const TO = pick.to ? pick.to : 'dhaka';
    const KEY = "IzU2Y04djRpUVpagLh1d";
    const URL_FROM = `https://api.maptiler.com/geocoding/[${FROM}].json?key=${KEY}`;
    const URL_TO = `https://api.maptiler.com/geocoding/[${TO}].json?key=${KEY}`;
    console.log(FROM, TO);

    useEffect(() => {
        fetch(URL_FROM)
            .then(res => res.json())
            .then(data => setFrom(data.features[0].geometry.coordinates))
            .catch(err => console.log(err))

        fetch(URL_TO)
            .then(res => res.json())
            .then(data => setTo(data.features[0].geometry.coordinates))
            .catch(err => console.log(err))
    }, []);

    const searchHandler = (e) => {
        setBtn(false);
        console.log('from ', from);
        console.log('To ', to)
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
                                    <button onClick={searchHandler} className="btn btn-danger w-100 py-2 mt-4">Search</button>
                                </Form.Group>
                            </Form>
                            :
                            <div className="pick-result">
                                <div className="from-to bg-danger">
                                    <h2>{pick.from}</h2>
                                    <h2>{pick.to}</h2>
                                </div>
                                <div className="card">
                                    <div className="card-details">
                                        <img src={rider.img} alt="" />
                                        <strong>{rider.rideName}</strong>
                                        <strong><FontAwesomeIcon icon={faUserFriends} />{rider.person}</strong>
                                        <strong>{rider.price}</strong>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-details">
                                        <img src={rider.img} alt="" />
                                        <strong>{rider.rideName}</strong>
                                        <strong><FontAwesomeIcon icon={faUserFriends} />{rider.person}</strong>
                                        <strong>{rider.price}</strong>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-details">
                                        <img src={rider.img} alt="" />
                                        <strong>{rider.rideName}</strong>
                                        <strong><FontAwesomeIcon icon={faUserFriends} />{rider.person}</strong>
                                        <strong>{rider.price}</strong>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-lg-7 col-sm-12">
                    <MyMap to={to} from={from} key="map"></MyMap>
                </div>
            </div>
        </div>
    );
};

export default Profile;