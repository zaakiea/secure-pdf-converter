import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: "convert",
      title: "Konversi File",
      desc: "Word, Excel, atau Gambar ke PDF",
      icon: "fa-exchange-alt",
      color: "#4e73df",
    },
    {
      id: "ocr",
      title: "OCR (Scan Teks)",
      desc: "Ekstrak teks dari gambar ke PDF",
      icon: "fa-eye",
      color: "#1cc88a",
    },
    {
      id: "merge",
      title: "Gabung PDF (Merge)",
      desc: "Satukan banyak file jadi satu",
      icon: "fa-object-group",
      color: "#36b9cc",
    },
    {
      id: "split",
      title: "Pisah PDF (Split)",
      desc: "Ambil halaman tertentu saja",
      icon: "fa-cut",
      color: "#e74a3b",
    },
  ];

  return (
    <div
      className="home-container"
      style={{ textAlign: "center", padding: "40px 20px" }}
    >
      <h1 className="mb-4">Pilih Fitur yang Anda Butuhkan</h1>
      <p className="mb-5 text-muted">
        Secure PDF Converter & Editor dengan Teknologi Sistem Cerdas
      </p>

      <div
        className="features-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {features.map((feat) => (
          <div
            key={feat.id}
            className="feature-card"
            onClick={() => navigate(`/upload/${feat.id}`)}
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              borderTop: `5px solid ${feat.color}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                color: feat.color,
                marginBottom: "20px",
              }}
            >
              <i className={`fas ${feat.icon}`}></i>
            </div>
            <h3>{feat.title}</h3>
            <p style={{ color: "#666" }}>{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
