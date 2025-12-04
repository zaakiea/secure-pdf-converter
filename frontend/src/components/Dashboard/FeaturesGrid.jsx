import React from "react";
import { Link } from "react-router-dom";

const FeaturesGrid = () => {
  const features = [
    {
      id: "convert",
      title: "Konversi ke PDF",
      desc: "Ubah Word, Excel, PowerPoint, atau Gambar menjadi PDF.",
      icon: "fa-exchange-alt",
      color: "#007bff",
    },
    {
      id: "ocr",
      title: "OCR PDF",
      desc: "Ekstrak teks dari gambar atau PDF hasil scan menjadi teks yang bisa diedit.",
      icon: "fa-eye",
      color: "#28a745",
    },
    {
      id: "merge",
      title: "Gabung PDF",
      desc: "Satukan banyak file PDF menjadi satu dokumen urut.",
      icon: "fa-object-group",
      color: "#6f42c1",
    },
    {
      id: "split",
      title: "Pisah PDF",
      desc: "Ambil halaman tertentu atau pisahkan satu PDF menjadi beberapa bagian.",
      icon: "fa-cut",
      color: "#dc3545",
    },
  ];

  return (
    <div className="features-grid">
      {features.map((feature) => (
        <Link
          to={`/tool?feature=${feature.id}`}
          key={feature.id}
          className="feature-card-link"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="feature-card">
            <div
              className="icon-wrapper"
              style={{
                backgroundColor: `${feature.color}20`,
                color: feature.color,
              }}
            >
              <i className={`fas ${feature.icon} fa-2x`}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturesGrid;
