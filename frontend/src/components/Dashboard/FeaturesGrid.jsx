import React from 'react';

const FeaturesGrid = () => {
  const features = [
    { icon: 'fa-file-pdf', title: 'Konversi Dasar', desc: 'Ubah Word, Excel, dan Gambar menjadi PDF' },
    { icon: 'fa-eye', title: 'Sistem Cerdas (OCR)', desc: 'Ekstrak teks dari gambar pindaian' },
    { icon: 'fa-object-group', title: 'Manipulasi PDF', desc: 'Gabungkan atau pisahkan file PDF' },
    { icon: 'fa-lock', title: 'Keamanan', desc: 'Enkripsi AES-256 dan auto-delete' },
  ];

  return (
    <div className="features-grid">
      {features.map((f, i) => (
        <div key={i} className="feature-card">
          <div className="feature-icon">
            <i className={`fas ${f.icon}`}></i>
          </div>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesGrid;