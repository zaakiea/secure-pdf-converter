import React from 'react';

const ProgressBar = ({ progress, text }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-text">
        <span>{text}</span>
        <span>{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;