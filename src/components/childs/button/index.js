import React from "react";
import btnSpiner from "./btn-loading-spinner.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const DeteteButton = props => {
  return (
    <button
      onClick={props.onClick}
      style={{ right: "10px", top: "-10px" }}
      className={`btn waves-effect btn-${props.size} btn-floating right waves-dark grey lighten-4 white z-depth-0`}
    >
      <i className="material-icons grey-text prefix">delete</i>
    </button>
  );
};

export const EditButton = props => {
  return props.type === "Link" ? (
    <Link
      to={props.to}
      className={`btn waves-effect waves-light btn-${props.size} btn-floating right pink darken-2`}
    >
      {" "}
      <i className="material-icons prefix">edit</i>
    </Link>
  ) : (
    <button
      className={`btn waves-effect waves-light btn-${props.size} btn-floating right pink darken-2`}
    >
      <i className="material-icons prefix">edit</i>
    </button>
  );
};

export const SubmitButton = props => {
  const isSpinning = useSelector(state => {
    return state.loaderState.isSipinning;
  });

  const defaultDesgin = {
    width: "20px",
    position: "relative",
    top: "5px",
    right: "-6px"
  };
  const largeDesign = {
    width: "25px",
    position: "relative",
    right: "-15px",
    top: "6px"
  };
  const smallDesgin = {
    width: "15px",
    position: "relative",
    right: "-6px",
    top: "2px"
  };

  const clickHandler = e => {
    if (
      typeof props.onClick != "undefined" &&
      typeof props.onClick === "function"
    ) {
      props.onClick(e);
    }
    //do somthing for click listener
  };

  return (
    <button
      type="submit"
      onClick={clickHandler}
      disabled={isSpinning}
      className={`btn pink btn-${props.size} waves-effect waves-light lighten-1`}
    >
      {props.children}
      {isSpinning === true && props.async === true ? (
        <img
          style={
            props.size === "large"
              ? largeDesign
              : props.size === "small"
              ? smallDesgin
              : defaultDesgin
          }
          src={btnSpiner}
          alt="..."
        />
      ) : (
        ""
      )}
    </button>
  );
};

