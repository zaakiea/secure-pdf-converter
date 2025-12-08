import React from "react";

const UploadArea = ({ onUpload, disabled }) => {
  const handleChange = (e) => {
    // Cegah upload jika disabled
    if (disabled) return;

    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files));
    }
  };

  // Style khusus jika disabled
  const containerStyle = disabled
    ? {
        opacity: 0.5,
        cursor: "not-allowed",
        backgroundColor: "#f0f0f0",
        borderStyle: "solid",
      }
    : {};

  return (
    <div className="upload-area mb-3" style={containerStyle}>
      <input
        type="file"
        multiple
        id="fileInput"
        className="hidden-input"
        onChange={handleChange}
        disabled={disabled} // Matikan input asli
        style={{ display: "none" }}
      />

      {/* Jika disabled, jangan pakai htmlFor agar label tidak memicu input file */}
      <label
        htmlFor={disabled ? null : "fileInput"}
        className="upload-label"
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
        <div className="icon">
          <i
            className={`fas ${
              disabled ? "fa-ban" : "fa-cloud-upload-alt"
            } fa-3x`}
          ></i>
        </div>

        {disabled ? (
          <p className="text-danger fw-bold">
            ⚠️ Silakan pilih format konversi di atas terlebih dahulu!
          </p>
        ) : (
          <>
            <p>
              Klik untuk memilih file atau <strong>Drag & Drop</strong> di sini
            </p>
            <span className="info">Mendukung: DOCX, XLSX, JPG, PNG, PDF</span>
          </>
        )}
      </label>
    </div>
  );
};

export default UploadArea;
