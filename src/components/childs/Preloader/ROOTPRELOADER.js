import React from "react";
import spinner from "./gform-ajax-spinner.gif";
const ROOTPRELOADER = () => {
  return (
    <div>
      <style>
        {`
          .rootspinnergit{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.6;
            width: 30px;
          }
        `}
      </style>
      <img className="rootspinnergit" src={spinner} alt="LOADING..." />
    </div>
  );
};

export default ROOTPRELOADER;
