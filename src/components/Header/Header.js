import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { contextAPI } from '../../App';

const Header = () => {
    const [user, setUser] = useContext(contextAPI);
    const {isSignedIn , name , email , img} = user;

    return (
        <div className='header-container'>
            <div className="logo">
                <a href="/">City Riders</a>
            </div>
            <nav className="nav">
                <Link to="/">Home</Link>
                <a href="/destination">Destination</a>
                <a href="/blog">Blog</a>
                <a href="/contact">Contact</a>
                {
                    isSignedIn ?
                        <a href=""><strong> {name} </strong></a>
                        :
                        <Link className="login-link" to="/login">
                            <button className="btn login-btn">Login</button>
                        </Link>
                }
            </nav>
        </div>
    );
};

export default Header;