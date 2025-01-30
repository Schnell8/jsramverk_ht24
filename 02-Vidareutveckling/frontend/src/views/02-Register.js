import React from "react";
import Register from "../components/Register";

// style
import "../styles/InsideContainer.css"

const RegisterView = () => {
    return (
        <div className="container">
            <div className="inside-container">
                <div className="middle">
                    <Register />
                </div>
            </div>
        </div>
    );
};

export default RegisterView;