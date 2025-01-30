import React from "react";
import Nav from "../components/Nav";
import Profile from "../components/Profile";
import Footer from "../components/Footer";

// style
import "../styles/InsideContainer.css"

const HomeView = () => {
    return (
        <div className="container">
            <div className="inside-container">
                <div className="top">
                    <Nav />
                </div>

                <div className="middle">
                    <Profile />
                </div>

                <div className="bottom">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default HomeView;