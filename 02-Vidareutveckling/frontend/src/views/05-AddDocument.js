import React from "react";
import Nav from "../components/Nav";
import AddDocument from "../components/AddDocument";
import Footer from "../components/Footer";

// style
import "../styles/InsideContainer.css"

const AddDocumentView = () => {
    return (
        <div className="container">
            <div className="inside-container">
                <div className="top">
                    <Nav />
                </div>

                <div className="middle">
                    <AddDocument />
                </div>

                <div className="bottom">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AddDocumentView;