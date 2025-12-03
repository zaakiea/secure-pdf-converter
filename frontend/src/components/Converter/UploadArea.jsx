import React, { useRef } from 'react';

const UploadArea = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    // Filter file types if needed
    onUpload(files);
  };

  return (
    <div 
      className="upload-area"
      onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#2980b9'; }}
      onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#3498db'; }}
      onDrop={(e) => { 
        e.preventDefault(); 
        e.currentTarget.style.borderColor = '#3498db'; 
        handleFiles(e); 
      }}
      onClick={() => fileInputRef.current.click()}
    >
      <div className="upload-icon">
        <i className="fas fa-cloud-upload-alt"></i>
      </div>
      <h3>Unggah File Anda</h3>
      <p>Drag & drop file atau klik untuk memilih</p>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        Format yang didukung: PDF, DOCX, XLSX, JPG, PNG
      </p>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        multiple 
        onChange={handleFiles} 
      />
    </div>
  );
};

export default UploadArea;