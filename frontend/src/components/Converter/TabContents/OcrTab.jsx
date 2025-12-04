import React from "react";

const OcrTab = ({ options, setOption }) => {
  return (
    <div className="tab-content active bg-white p-3 border rounded">
      <h4>
        <i className="fas fa-eye"></i> Optical Character Recognition (OCR)
      </h4>
      <p className="text-muted small">
        Ekstrak teks dari gambar agar bisa dicopy-paste.
      </p>

      <div className="mb-2">
        <label className="form-label">Bahasa Dokumen:</label>
        <select
          className="form-select"
          value={options.ocrLanguage}
          onChange={(e) => setOption("ocrLanguage", e.target.value)}
        >
          <option value="eng">Inggris (English)</option>
          {/* Tambahkan opsi lain jika backend sudah support */}
        </select>
      </div>
      <div className="alert alert-info py-2">
        <small>
          <i className="fas fa-info-circle"></i> Proses OCR mungkin memakan
          waktu lebih lama tergantung kualitas gambar.
        </small>
      </div>
    </div>
  );
};

export default OcrTab;
