import React from "react";

const ConvertTab = ({ selectedFormat, onSelectFormat }) => {
  const formats = [
    {
      id: "docx",
      label: "Word ke PDF",
      desc: "Konversi dokumen .docx menjadi PDF",
      icon: "fa-file-word",
    },
    {
      id: "xlsx",
      label: "Excel ke PDF",
      desc: "Konversi spreadsheet .xlsx menjadi PDF",
      icon: "fa-file-excel",
    },
    {
      id: "image",
      label: "Gambar ke PDF",
      desc: "Konversi foto JPG/PNG menjadi PDF",
      icon: "fa-image",
    },
  ];

  return (
    <div className="tab-content active bg-white p-3 border rounded">
      <h3 className="mb-2">Pilih Format Asal</h3>
      <p className="text-muted small mb-3">
        Pilih jenis file yang ingin Anda ubah menjadi PDF.
      </p>

      <div className="options-grid">
        {formats.map((fmt) => (
          <div
            key={fmt.id}
            className={`option-card ${
              selectedFormat === fmt.id ? "selected" : ""
            }`}
            onClick={() => onSelectFormat(fmt.id)}
          >
            <div className="option-icon">
              <i className={`far ${fmt.icon}`}></i>
            </div>
            <h4>{fmt.label}</h4>
            <p>{fmt.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConvertTab;
