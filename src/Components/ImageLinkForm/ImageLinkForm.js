import React from "react";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"Try it out by linking any art below:"}
        <div className="pa4 flex justify-center items-center">
          <input type="text" className="f4 w-40 mr2" onChange={onInputChange} />
          <button
            className="w-5 pv2 bw0 grow f6 ph3 shadow-5 white bg-mid-gray"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </p>
    </div>
  );
};

export default ImageLinkForm;
