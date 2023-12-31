import React from "react";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, input }) => {
  return (
    <div>
      <p className="f3">
        {"Try it out by linking any art below:"}
        <div className="pa4 flex justify-center items-center">
          <input type="text" className="f4 w-40 mr2" onChange={onInputChange} />
          {input.length < 2000 && (
            <button
              className="w-5 pv2 bw0 grow f6 ph3 shadow-5 white bg-mid-gray"
              onClick={onButtonSubmit}
            >
              Detect
            </button>
          )}
        </div>
        {input.length >= 2000 && (
          <p className="red">
            Please use a link shorter than 2000 characters <br />
            (open image source instead of getting link directly from google)
          </p>
        )}
      </p>
    </div>
  );
};

export default ImageLinkForm;
