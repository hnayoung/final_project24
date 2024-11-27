import React, { useState } from "react";
import LeftPane from "../../component/LeftPane/LeftPane";
import RightPane from "../../component/RightPane/RightPane";
import SplitBar from "../../component/SplitBar/SplitBar";
import "./Main.css";

const Main = () => {
  const [leftWidth, setLeftWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const newWidth = e.clientX;
    if (newWidth > 100 && newWidth < 600) {
      setLeftWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="main-container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <LeftPane isCollapsed={isCollapsed} onCollapse={handleCollapse} width={leftWidth} />
      {!isCollapsed && <SplitBar onMouseDown={handleMouseDown} />}
      <RightPane />
    </div>
  );
};

export default Main;
