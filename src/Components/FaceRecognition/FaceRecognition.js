import React from "react";
import "./FaceRecognition.css";
import copy from "./copy-solid.svg";

const FaceRecognition = ({ imageUrl, box, colors }) => {
  return (
    <div className="center flex-col items-center justify-center ml-1 mr-1">
      <div className="mt2">
        <img
          id="inputimage"
          className="ma2"
          width="372px"
          height="auto"
          src={imageUrl}
          alt=""
        ></img>
        {/* <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>   */}
      </div>
      {colors[0] && (
        <div className="flex items-center justify-center">
          <div className="flex-col ml4 tl">
            {colors[0] && <h1 className="tc">Colors:</h1>}
            {colors.map((item) => {
              return (
                <p key={item.w3c.name} className="pv2">
                  {item.w3c.name}
                </p>
              );
            })}
          </div>
          <div className="flex-col mt5">
            {colors.map((item) => {
              return (
                <p key={item.value} className="pv2">
                  {Math.floor(item.value * 100)}%
                </p>
              );
            })}
          </div>
          <div className="flex-col mt5 ml4 pointer">
            {colors.map((item) => {
              return (
                <div key={item.w3c.hex} className="flex items-center">
                  <p
                    className="hex"
                    onClick={() => {
                      navigator.clipboard.writeText(item.w3c.hex);
                    }}
                    style={{ background: `${item.w3c.hex}` }}
                  >
                    {item.w3c.hex}
                  </p>
                  <img className="copy ml1" src={copy} alt="copy-button"></img>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
