import React from "react";

const SecurityPanel = ({ options, setOption }) => {
  return (
    <div className="security-panel mb-3 p-3 bg-light rounded border">
      <div className="form-check mb-2">
        <input
          type="checkbox"
          id="usePass"
          className="form-check-input"
          checked={options.usePassword || false}
          onChange={(e) => {
            setOption("usePassword", e.target.checked);
            if (!e.target.checked) setOption("password", ""); // Reset password jika uncheck
          }}
        />
        <label
          htmlFor="usePass"
          className="form-check-label ms-2 fw-bold text-dark"
        >
          <i className="fas fa-lock me-1"></i> Proteksi Dokumen (Enkripsi)
        </label>
      </div>

      {options.usePassword && (
        <div className="mt-2 animate-fade-in">
          <input
            type="password"
            className="form-control form-control-sm"
            placeholder="Masukkan password untuk membuka PDF..."
            value={options.password || ""}
            onChange={(e) => setOption("password", e.target.value)}
          />
          <small className="text-muted fst-italic mt-1 d-block">
            *Dokumen akan dienkripsi dengan algoritma AES-256.
          </small>
        </div>
      )}
    </div>
  );
};

export default SecurityPanel;
