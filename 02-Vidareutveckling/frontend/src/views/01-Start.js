import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/jsramverk-logo.png";

// style
import "../styles/Start.css";
import "../styles/Button.css";

const StartView = () => {
    const navigate = useNavigate();

    return (
        <div className="start-page">
            <div className="left-section">
                <img 
                    src={logo}
                    alt="jsramverk-logo"
                    className="logo"
                />
            </div>
            <div className="right-section">
                <div className="auth-buttons">
                    <button className="btn auth blue" onClick={() => navigate("/register")}>Register</button>
                    <h2>Already have an account?</h2>
                    <button className="btn auth green" onClick={() => navigate("/login")}>Log In</button>
                </div>
            </div>
        </div>
    );
};

export default StartView;