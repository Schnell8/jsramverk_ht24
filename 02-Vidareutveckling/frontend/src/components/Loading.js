import React from "react";
import loading from "../assets/loading.svg";

// Style
import "../styles/Loading.css"

const Loading = () => (
    <div className="spinner">
        <img src={loading} alt="Loading" />
    </div>
);

export default Loading;
