import React from 'react';

const ConvertTab = ({ selectedFormat, onSelectFormat }) => {
  const formats = [
    { id: 'docx', label: 'PDF ke Word', desc: 'Konversi PDF ke .docx', icon: 'fa-file-word' },
    { id: 'xlsx', label: 'PDF ke Excel', desc: 'Konversi PDF ke .xlsx', icon: 'fa-file-excel' },
    { id: 'image', label: 'PDF ke Gambar', desc: 'Konversi PDF ke JPG/PNG', icon: 'fa-image' },
  ];

  return (
    <div className="tab-content active">
      <h3 className="mb-2">Konversi PDF</h3>
      <div className="options-grid">
        {formats.map(fmt => (
          <div 
            key={fmt.id}
            className={`option-card ${selectedFormat === fmt.id ? 'selected' : ''}`}
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