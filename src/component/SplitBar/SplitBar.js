import React from "react";
import "./SplitBar.css";

const SplitBar = ({ onMouseDown }) => {
  return <div className="split-bar" onMouseDown={onMouseDown}></div>;
};

export default SplitBar;
