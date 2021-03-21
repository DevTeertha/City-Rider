import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import { Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { contextAPI } from '../../App';
import { googleSignIn, emailSignIn } from '../Firebase/FirebaseLoginRegister';
import firebase from "firebase/app";

const Login = () => {
    const [user, setUser] = useContext(contextAPI);
    const [msg , setMsg] = useState({
        forgetPassword: ''
    });
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const onBlurHandler = (e) => {
        const newUser = { ...user }
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }

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

    const signInUser = (e) => {
        emailSignIn(user.email, user.password)
            .then(res => {
                setUser(res);
                history.replace(from);
            })
            .catch(error => {
                setMsg({forgetPassword: ''});
                setUser(error);
            });
        e.preventDefault();
    }

    const resetPassword = () => {
        const auth = firebase.auth();
        const emailAddress = user.email;

        auth.sendPasswordResetEmail(emailAddress).then(function () {
            const newMsg = {...msg};
            const forgetPasswordMsg = 'Email Has Been Sent Please Check Your Email: '+emailAddress;
            newMsg.forgetPassword = forgetPasswordMsg;
            setMsg(newMsg);
        })
            .then(res => console.log(res))
            .catch(function (error) {
                // An error happened.
            });

    }


    return (
        <div className="container">
            <Header></Header>
            <div className="login-container mx-auto mt-5">
                <div className="login-box border p-4 rounded">
                    <h2>Login</h2>
                    <Form className="mt-4">
                        <p style={{ textAlign: 'center', color: 'red' }}>{user.errorLogin}</p>
                        <p className="text-success text-center">{msg.forgetPassword}</p>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onBlur={onBlurHandler} type="email" name="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onBlur={onBlurHandler} type="password" name="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Link onClick={resetPassword} className="text-danger" path='/reset-password'>Forget Password</Link>
                        </Form.Group>

                        <br />
                        <button onClick={signInUser} className="w-100 btn py-2 btn-danger" type="submit">Login</button>
                        <br />
                        <br />
                        <p className="text-center">Don't have an account?
                        <Link className="text-danger" to="/register"> Create an account</Link>
                        </p>
                    </Form>
                </div>
                <div className="social-media text-center p-4">
                    <p>Or</p>
                    <button onClick={signInGoogle} className="btn btn-outline-success p-2 w-100 border social-btn"><FontAwesomeIcon icon={faGoogle} /> Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;