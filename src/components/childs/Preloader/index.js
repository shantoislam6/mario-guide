import React from "react";
import preloaderImage from "./gform-ajax-spinner.gif";
import { useSelector } from "react-redux";
const Preloader = () => {
  const isPreloading = useSelector(state => {
    return state.loaderState.isPreloading;
  });

  return (
    <React.Fragment>
      {isPreloading ? <PreloaderTemplate /> : <React.Fragment />}
    </React.Fragment>
  );
};

export function PreloaderTemplate() {
  return (
    <div className="preloader-container">
      <style type="text/css">
        {`
        .preloader-container {
            width: 100%;
            position: fixed;
            top: 65px;
            left: 0;
            height: 100%;
            background: #e2f5db4f;
            z-index: 99;
          }
            .preloader-anim {
              position: absolute;
              left: 50%;
              top: 41%;
              transform: translate(-50%, -50%);
            }
            .preloader-anim img{
              width:30px;
              opacity:0.5
            }
          `}
      </style>
      <div className="preloader-anim">
        <img src={preloaderImage} alt="Loading..." />
      </div>
    </div>
  );
}

export default Preloader;
