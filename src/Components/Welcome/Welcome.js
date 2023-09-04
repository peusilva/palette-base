import React from "react";

const Welcome = ({ onRouteChange }) => {
  return (
    <div>
      <div className="f1">Welcome to Palette Base!</div>
      <div className="pb6">
        Use AI to detect and generate a complete colour palette to use in your
        project, {window.innerWidth > 750 && <br />}
        based on whatever art you want!
      </div>
      <p
        onClick={() => onRouteChange("signin")}
        className="f5 mh4 pointer white bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box"
      >
        Sign In
      </p>
      <p
        onClick={() => onRouteChange("register")}
        className="f5 pointer white bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box"
      >
        Register
      </p>
      <div onClick={() => onRouteChange("home")}> DEV </div>
    </div>
  );
};

export default Welcome;
