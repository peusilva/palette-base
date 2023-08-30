import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import palette from "./palette.png";

const Logo = ({ onRouteChange }) => {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.8}
      glareColor="#ffffff"
      glarePosition="bottom"
      glareBorderRadius="5px"
      className="br4 bg-black-50 pa3 tilt shadow-5"
    >
      <img onClick={() => onRouteChange("welcome")} src={palette} alt="logo" />
    </Tilt>
  );
};

export default Logo;
