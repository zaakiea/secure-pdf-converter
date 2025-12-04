import React from "react";

const FileList = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <ul className="file-list mb-3">
      {files.map((file, index) => (
        <li key={index} className="file-item">
          <span className="file-icon">
            <i className="fas fa-file"></i>
          </span>
          <span className="file-name">{file.name}</span>
          <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
          <button className="btn-remove" onClick={() => onRemove(index)}>
            <i className="fas fa-times"></i>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
