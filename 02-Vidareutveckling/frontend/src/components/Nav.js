import React from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../assets/jsramverk-logo.png";

// Style
import "../styles/Nav.css";

const Nav = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };
    
    return (
        <div className="nav">
            <div className="nav-container">
                <div className="logo">
                    <img src={logo} alt="jsramverk-logo" />
                </div>

                <div className="nav-links">
                        <button onClick={() => handleNavigate("/home")}>Home</button>
                        <button className="logout" onClick={() => handleNavigate("/")}>Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default Nav;