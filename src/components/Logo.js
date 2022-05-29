import React from "react";
import "./Logo.css";

const Logo = ({imageSrc}) => {
    return(
        <div className="logo">
            <img src={imageSrc} alt="logo" className="logo-image"/>
        </div>
    );
};

export default Logo;