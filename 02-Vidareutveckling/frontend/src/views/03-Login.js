import React from "react";
import Login from "../components/Login";

// style
import "../styles/InsideContainer.css"

const LoginView = () => {
    return (
        <div className="container">
            <div className="inside-container">
                <div className="middle">
                    <Login />
                </div>
            </div>
        </div>
    );
};

export default LoginView;