import React, { useContext, useState } from 'react';
import './Resgister.css';
import { Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Header from '../Header/Header';
import { contextAPI } from '../../App';
import { googleSignIn, createAccount } from '../Firebase/FirebaseLoginRegister';
import profileImage from '../../images/peopleicon.png';
import firebase from "firebase/app";

const Register = () => {
    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        createAccountError: '',
        loginError: ''
    })
    const { emailError, passwordError, confirmPasswordError, createAccountError } = error;

    const [user, setUser] = useContext(contextAPI);
    console.log(user);
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

    const setUserEvent = (name, value, valid) => {
        if (valid) {
            const newUser = { ...user };
            newUser[name] = value;
            setUser(newUser);
        }
        else {
            const newError = { ...error };
            if (name === 'email') {
                newError.emailError = " is not valid";
                setError(newError);
            }
            if (name === 'password') {
                newError.passwordError = " must be 6 character";
                setError(newError);
            }
            if (name === 'confirmPassword') {
                newError.confirmPasswordError = " is not matched with password";
                setError(newError);
            }
        }
    }

    const checkFormValid = (e) => {
        let isFormValid = true;
        const newError = { ...error };

        if (e.target.name === 'name') {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }

        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
            newError.emailError = '';
            setError(newError);
            setUserEvent(e.target.name, e.target.value, isFormValid);
        }
        if (e.target.name === 'password') {
            isFormValid = e.target.value.length >= 6;
            newError.passwordError = '';
            setError(newError);
            setUserEvent(e.target.name, e.target.value, isFormValid);
        }
        if (e.target.name === 'confirmPassword') {
            isFormValid = user.password === e.target.value;
            newError.confirmPasswordError = '';
            setError(newError);
            setUserEvent(e.target.name, e.target.value, isFormValid);
        }
    }

    // Direct Authentication
    const submitHandler = (e) => {
        if (user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newError = {...error}
                    newError.createAccountError = '';
                    setError(newError);

                    updateUserName(user.name);
                    const {displayName , email} = res.user;
                    const createUser = {...user}
                    createUser.isSignedIn = true;
                    createUser.img = profileImage;
                    setUser(createUser);
                    history.replace('/destination');
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    const newError = {...error}
                    newError.createAccountError = errorMessage;
                    setError(newError);
                });
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
            <div className="login-container mx-auto mt-5">
                <div className="login-box border p-4 rounded">
                    <h2>Create an account</h2>
                    <Form className="mt-4">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required onBlur={checkFormValid} type="text" name="name" placeholder="Enter your name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>  <small style={{ color: 'red', textAlign: 'center' }}>{emailError}</small>
                            <Form.Control required onBlur={checkFormValid} type="email" name="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>  <small style={{ color: 'red', textAlign: 'center' }}>{passwordError}</small>
                            <Form.Control required onBlur={checkFormValid} type="password" name="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>  <small style={{ color: 'red', textAlign: 'center' }}>{confirmPasswordError}</small>
                            <Form.Control required onBlur={checkFormValid} type="password" name="confirmPassword" placeholder="Confirm Password" />
                        </Form.Group>
                        <br />
                        <button onClick={submitHandler} className="w-100 btn btn-danger py-2" type="submit">Create an account</button>
                        <br />
                        <br />
                        <p className="text-center">Already have an account?<Link className="text-danger" to="/login"> Login</Link> </p>
                    </Form>
                    <p style={errorStyle}>{createAccountError}</p>
                </div>
                <div className="social-media text-center p-4">
                    <p>Or</p>
                    <button onClick={signInGoogle} className="btn btn-outline-success p-2 w-100 border social-btn"><FontAwesomeIcon icon={faGoogle} /> Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;