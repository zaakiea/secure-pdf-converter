import React from 'react';

const FileList = ({ files, onRemove }) => {
  const getIcon = (type) => {
    if (type.includes('pdf')) return 'fa-file-pdf';
    if (type.includes('word') || type.includes('document')) return 'fa-file-word';
    if (type.includes('excel') || type.includes('sheet')) return 'fa-file-excel';
    if (type.includes('image')) return 'fa-image';
    return 'fa-file';
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  if (files.length === 0) return null;

  return (
    <div className="file-list">
      {files.map((file, index) => (
        <div key={index} className="file-item">
          <div className="file-info">
            <div className="file-icon">
              <i className={`far ${getIcon(file.type)}`}></i>
            </div>
            <div className="file-details">
              <h4>{file.name}</h4>
              <p>{formatSize(file.size)}</p>
            </div>
          </div>
          <button className="btn btn-danger" onClick={() => onRemove(index)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileList;