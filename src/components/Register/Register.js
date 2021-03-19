import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Header from '../Header/Header';

const Register = (props) => {
    const googleSignIn = props.signInGoogle;

    return (
        <div className="container">
            <Header></Header>
            <div className="login-container w-50 mx-auto mt-5">
                <div className="login-box border p-4 rounded">
                    <h2>Create an account</h2>
                    <Form className="mt-4">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter your name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirm-password" placeholder="Confirm Password" />
                        </Form.Group>
                        <br />
                        <button className="w-100 btn login-btn py-2" type="submit">
                            Create an account
                        </button>
                        <br />
                        <br />
                        <p className="text-center">Already have an account? <Link className="color-tomato" to="/login">Login</Link> </p>
                    </Form>
                </div>
                <div className="social-media text-center p-4">
                    <p>Or</p>
                    <button onClick={googleSignIn} className="btn btn-outline-dark p-2 w-100 border social-btn"><FontAwesomeIcon icon={faGoogle} /> Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;