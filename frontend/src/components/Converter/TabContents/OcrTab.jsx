import React from "react";

const OcrTab = ({ options, setOption }) => {
  return (
    <div className="tab-content active bg-white p-3 border rounded">
      <h4>
        <i className="fas fa-eye"></i> Optical Character Recognition (OCR)
      </h4>
      <p className="text-muted small">
        Sistem Cerdas akan memindai gambar dan mengubah tulisan di dalamnya
        menjadi teks PDF yang bisa diedit/disalin.
      </p>

      <div className="mb-3">
        <label className="form-label fw-bold">Bahasa Dokumen:</label>
        <select
          className="form-select"
          value={options.ocrLanguage || "eng"} // Default ke English jika kosong
          onChange={(e) => setOption("ocrLanguage", e.target.value)}
        >
          <option value="ind">Bahasa Indonesia</option>
          <option value="eng">Bahasa Inggris (English)</option>
          <option value="mix">Otomatis (Indonesia & Inggris)</option>
        </select>
        <div className="form-text text-info">
          <i className="fas fa-lightbulb"></i> Pilih "Otomatis" jika dokumen
          mengandung dua bahasa sekaligus.
        </div>
      </div>

      <div className="alert alert-secondary py-2">
        <small>
          <i className="fas fa-info-circle"></i> <strong>Catatan:</strong>{" "}
          Proses OCR membutuhkan waktu lebih lama (5-10 detik) dibandingkan
          konversi biasa karena menggunakan kecerdasan buatan untuk membaca
          piksel gambar dan melakukan pembersihan noise.
        </small>
      </div>
    </div>
  );
};

export default OcrTab;
