import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { contextAPI } from '../../App';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Header = () => {
    const [user, setUser] = useContext(contextAPI);
    const { isSignedIn, name } = user;

    const signOut = () => {
        const logoutInfo = {...user};
        logoutInfo.email = '';
        logoutInfo.name = '';
        logoutInfo.img = '';
        logoutInfo.isSignedIn=false;
        setUser(logoutInfo);
    }

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
                        <Popup trigger={<Link className="nav-link text-danger"><strong> {name.slice(0, 7)} </strong></Link>} position="bottom">
                            <div className="popup-container px-3 my-3">
                                <p className="text-center text-danger"><strong>Your Profile</strong></p>
                                <div className="profile-img">
                                    <img className="border border-danger" src={user.img} alt="" />
                                </div>
                                <div className="profile-details text-center text-danger mt-2">
                                    <p><strong>{user.name}</strong></p>
                                </div>
                                <button onClick={signOut} className="btn btn-outline-danger w-100 my-3">Sign Out</button>
                            </div>
                        </Popup>
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