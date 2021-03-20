import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { contextAPI } from '../../App';
import { Nav } from 'react-bootstrap';

const Header = () => {
    const [user, setUser] = useContext(contextAPI);
    const { isSignedIn, name, email, img } = user;

    return (
        <nav className="nav-container">
            <div className="logo">
                <a href="/"><strong>City Riders</strong></a>
            </div>
            <ul className="nav-menu">
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/destination">Destination</Link></li>
                <li><Link className="nav-link" to="/">Blog</Link></li>
                <li><Link className="nav-link" to="/">Contact</Link></li>
                <li>{
                    isSignedIn ?
                        <Link className="nav-link" to='/'><strong> {name} </strong></Link>
                        :
                        <Link className="login-link nav-link" to="/login">
                            <button className="btn login-btn">Login</button>
                        </Link>
                }</li>
            </ul>
        </nav>
    );
};

export default Header;