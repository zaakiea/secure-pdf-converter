import React from "react";

const SplitTab = ({ options, setOption }) => {
  return (
    <div className="tab-content active bg-white p-3 border rounded">
      <h4>
        <i className="fas fa-cut"></i> Pisah PDF (Split)
      </h4>
      <p>Masukkan rentang halaman yang ingin diambil dari PDF asli.</p>

      <div className="mb-3">
        <label className="form-label">Rentang Halaman:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Contoh: 1-5 (Mengambil halaman 1 sampai 5)"
          value={options.pageRange}
          onChange={(e) => setOption("pageRange", e.target.value)}
        />
        <div className="form-text">
          Gunakan format <code>start-end</code>. Contoh: <code>1-3</code> akan
          membuat PDF baru berisi halaman 1, 2, dan 3.
        </div>
      </div>
    </div>
  );
};

export default SplitTab;
