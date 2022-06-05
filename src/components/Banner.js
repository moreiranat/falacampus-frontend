import React from "react";
import "./Banner.css";

const Banner = ({imageSrc}) => {
    return(
        <div className="banner">
            <img src={imageSrc} alt='' className="banner-image"/>
        </div>
    );
};

export default Banner;