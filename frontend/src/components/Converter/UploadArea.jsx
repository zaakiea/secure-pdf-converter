import React from "react";

const UploadArea = ({ onUpload }) => {
  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files));
    }
  };

  return (
    <div className="upload-area mb-3">
      <input
        type="file"
        multiple
        id="fileInput"
        className="hidden-input"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <label htmlFor="fileInput" className="upload-label">
        <div className="icon">
          <i className="fas fa-cloud-upload-alt fa-3x"></i>
        </div>
        <p>
          Klik untuk memilih file atau <strong>Drag & Drop</strong> di sini
        </p>
        <span className="info">Mendukung: DOCX, XLSX, JPG, PNG, PDF</span>
      </label>
    </div>
  );
};

export default UploadArea;
