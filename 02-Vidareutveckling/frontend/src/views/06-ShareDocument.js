import React from "react";
import Nav from "../components/Nav";
import ShareDocument from "../components/ShareDocument";
import Footer from "../components/Footer";

// style
import "../styles/InsideContainer.css"

const ShareDocumentView = () => {
    return (
        <div className="container">
            <div className="inside-container">
                <div className="top">
                    <Nav />
                </div>

                <div className="middle">
                    <ShareDocument />
                </div>

                <div className="bottom">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default ShareDocumentView;