import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Header from '../Header/Header';
import { contextAPI } from '../../App';
import { googleSignIn, createAccount } from '../Firebase/FirebaseLoginRegister';
import firebase from "firebase/app";

const Register = () => {
    const [error, setError] = useState({
        message: ''
    })

    const [user, setUser] = useContext(contextAPI);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const signInGoogle = () => {
        googleSignIn()
            .then(res => {
                const { displayName, email, photoURL } = res;
                const signedIn = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    img: photoURL
                }
                setUser(signedIn);
                history.replace(from);
            });
    }

    const checkFormValid = (e) => {
        let isFormValid = true;

        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            isFormValid = e.target.value.length > 6;
        }
        if (isFormValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
    }

    const submitHandler = (e) => {
        if (user.email && user.password) {
            createAccount(user.email, user.password)
                .then(res => {
                    const { email } = res.user;
                    const createdUser = {
                        isSignedIn: true,
                        name: user.name,
                        email: email,
                        error: ''
                    }
                    setUser(createdUser);
                    history.replace(from);
                    updateUserName(user.name);
                })
                .catch(error => {
                    const errorMessage = error.message;
                    const newUserInfo = { ...user }
                    newUserInfo.error = errorMessage;
                    setUser(newUserInfo);
                })
        }
        e.preventDefault();
    }
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('Updated Successfully');
        }).catch(function (error) {
            console.log(error)
        });

    }

    const errorStyle = { color: 'red', textAlign: 'center' };

    return (
        <div className="container">
            <Header></Header>
            <div className="login-container w-50 mx-auto mt-5">
                <div className="login-box border p-4 rounded">
                    <h2>Create an account</h2>
                    <Form className="mt-4">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required onBlur={checkFormValid} type="text" name="name" placeholder="Enter your name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>  <small style={{ color: 'red', textAlign: 'center' }}>{error.message}</small>
                            <Form.Control required onBlur={checkFormValid} type="email" name="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>  <small style={{ color: 'red', textAlign: 'center' }}>{error.message}</small>
                            <Form.Control required onBlur={checkFormValid} type="password" name="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>  <small style={{ color: 'red', textAlign: 'center' }}>{error.message}</small>
                            <Form.Control required onBlur={checkFormValid} type="password" name="confirmPassword" placeholder="Confirm Password" />
                        </Form.Group>
                        <br />
                        <button onClick={submitHandler} className="w-100 btn login-btn py-2" type="submit">Create an account</button>
                        <br />
                        <br />
                        <p className="text-center">Already have an account? <Link className="color-tomato" to="/login">Login</Link> </p>
                    </Form>
                    <p style={errorStyle}>{user.error}</p>
                </div>
                <div className="social-media text-center p-4">
                    <p>Or</p>
                    <button onClick={signInGoogle} className="btn btn-outline-dark p-2 w-100 border social-btn"><FontAwesomeIcon icon={faGoogle} /> Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;