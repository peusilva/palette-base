import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box, colors }) => {
  console.log(colors);
  return (
    <div className="center flex items-center justify-center ma">
      <div className="mt2">
        <img
          id="inputimage"
          className="ma2"
          width="500px"
          height="auto"
          src={imageUrl}
          alt=""
        ></img>
        {/* <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>   */}
      </div>
      <div className="flex-col ml5">
        {colors[0] && <h1>Colors:</h1>}
        {colors.map((item) => {
          return (
            <p>
              Name: {item.w3c.name} Weight: {Math.floor(item.value * 100)}%
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
