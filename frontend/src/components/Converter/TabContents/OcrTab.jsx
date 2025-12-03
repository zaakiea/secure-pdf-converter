import React from 'react';

const OcrTab = ({ options, setOption }) => {
  return (
    <div className="tab-content active">
      <h3 className="mb-2">Optical Character Recognition (OCR)</h3>
      <p>Ekstrak teks dari gambar atau PDF pindaian menjadi PDF yang dapat dicari.</p>
      
      <div className="security-options mt-2">
        <h4><i className="fas fa-sliders-h"></i> Pengaturan OCR</h4>
        <div className="form-group">
          <label>Bahasa Teks</label>
          <select 
            className="form-control"
            value={options.ocrLanguage}
            onChange={(e) => setOption('ocrLanguage', e.target.value)}
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
            <option value="multi">Multi-language</option>
          </select>
        </div>
        <div className="form-group">
          <label>Akurasi OCR</label>
          <select 
            className="form-control"
            value={options.ocrAccuracy}
            onChange={(e) => setOption('ocrAccuracy', e.target.value)}
          >
            <option value="high">Tinggi (Lebih Lambat)</option>
            <option value="medium">Sedang (Rekomendasi)</option>
            <option value="fast">Cepat</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OcrTab;