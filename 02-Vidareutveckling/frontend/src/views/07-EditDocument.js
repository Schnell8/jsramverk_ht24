import React from "react";
import Nav from "../components/Nav";
import EditDocument from "../components/EditDocument";
import Footer from "../components/Footer";

// style
import "../styles/InsideContainer.css"

const EditDocumentView = () => {
    return (
        <div className="container">
            <div className="inside-container">
                <div className="top">
                    <Nav />
                </div>

                <div className="middle">
                    <EditDocument />
                </div>

                <div className="bottom">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default EditDocumentView;