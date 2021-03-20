import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { contextAPI } from '../../App';

const Header = () => {
    const [user] = useContext(contextAPI);
    const { isSignedIn, name } = user;

    return (
        <nav className="nav-container">
            <div className="logo">
                <a className="text-danger" href="/"><strong>City Riders</strong></a>
            </div>
            <ul className="nav-menu">
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/destination">Destination</Link></li>
                <li><Link className="nav-link" to="/">Blog</Link></li>
                <li><Link className="nav-link" to="/">Contact</Link></li>
                <li>{
                    isSignedIn ?
                        <Link className="nav-link text-danger" to='/'><strong> {name} </strong></Link>
                        :
                        <Link className="login-link nav-link" to="/login">
                            <button className="btn btn-danger">Login</button>
                        </Link>
                }</li>
            </ul>
        </nav>
    );
};

export default Header;