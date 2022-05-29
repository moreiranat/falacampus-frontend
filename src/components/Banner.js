import React from "react";
import "./Banner.css";

const Banner = ({imageSrc}) => {
    return(
        <div className="banner">
            <img src={imageSrc} className="banner-image"/>
        </div>
    );
};

export default Banner;