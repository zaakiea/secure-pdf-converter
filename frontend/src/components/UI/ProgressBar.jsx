import React from "react";

const ProgressBar = ({ progress, text }) => {
  return (
    <div className="progress-container mb-3">
      <div className="d-flex justify-content-between mb-1">
        <span>{text}</span>
        <span>{progress}%</span>
      </div>
      <div
        className="progress"
        style={{ height: "10px", background: "#e9ecef", borderRadius: "5px" }}
      >
        <div
          className="progress-bar bg-primary"
          style={{
            width: `${progress}%`,
            height: "100%",
            transition: "width 0.3s",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
