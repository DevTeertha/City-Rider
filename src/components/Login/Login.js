import React, { useContext } from 'react';
import Header from '../Header/Header';
import { Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { contextAPI } from '../../App';
import { googleSignIn, emailSignIn } from '../Firebase/FirebaseLoginRegister';


const Login = () => {
    const [user, setUser] = useContext(contextAPI);
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
                const { displayName, email } = res.user;
                const signedIn = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }
                setUser(signedIn);
                history.replace(from);
            })
            .catch(err => {
                const errorMessage = err.message;
                const newUserInfo = { ...user }
                newUserInfo.error = errorMessage;
                setUser(newUserInfo);
            })
        e.preventDefault();
    }


    return (
        <div className="container">
            <Header></Header>
            <div className="login-container w-50 mx-auto mt-5">
                <div className="login-box border p-4 rounded">
                    <h2>Login</h2>
                    <Form className="mt-4">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onBlur={onBlurHandler} type="email" name="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onBlur={onBlurHandler} type="password" name="password" placeholder="Password" />
                        </Form.Group>
                        <br />
                        <button onClick={signInUser} className="w-100 btn login-btn py-2" type="submit">Login</button>
                        <br />
                        <br />
                        <p className="text-center">Don't have an account?
                        <Link className="color-tomato" to="/register">Create an account</Link>
                        </p>
                    </Form>
                </div>
                <div className="social-media text-center p-4">
                    <p>Or</p>
                    <button onClick={signInGoogle} className="btn btn-outline-dark p-2 w-100 border social-btn"><FontAwesomeIcon icon={faGoogle} /> Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;