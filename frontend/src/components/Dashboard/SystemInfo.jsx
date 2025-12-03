import React from 'react';

const SystemInfo = () => {
  return (
    <div className="main-card mt-2">
      <div className="card-body">
        <h3><i className="fas fa-info-circle"></i> Informasi Sistem</h3>
        <div className="features-grid mt-2">
          <div className="feature-card">
            <i className="fas fa-microchip" style={{fontSize: '2rem', color: '#3498db', marginBottom: '1rem'}}></i>
            <h4>Arsitektur OOP</h4>
            <p>Menggunakan Inheritance, Polymorphism, Abstraction, dan Encapsulation</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-tachometer-alt" style={{fontSize: '2rem', color: '#3498db', marginBottom: '1rem'}}></i>
            <h4>Performansi</h4>
            <p>Merge 5 file dalam &lt; 10 detik, akurasi OCR minimal 90%</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-shield-alt" style={{fontSize: '2rem', color: '#3498db', marginBottom: '1rem'}}></i>
            <h4>Keamanan</h4>
            <p>Enkripsi AES-256 dan penghapusan file otomatis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;