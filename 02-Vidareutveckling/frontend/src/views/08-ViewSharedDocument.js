import React from "react";
import ViewSharedDocument from "../components/ViewSharedDocument";

// style
import "../styles/InsideContainer.css"

const ViewSharedDocumentView = () => {
    return (
        <div className="container">
            <div className="inside-container">
                <div className="middle">
                    <ViewSharedDocument />
                </div>
            </div>
        </div>
    );
};

export default ViewSharedDocumentView;