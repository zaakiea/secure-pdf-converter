import React from "react";

const SecurityPanel = ({ options, setOption }) => {
  return (
    <div className="security-panel mb-3 p-3 bg-light rounded">
      <div className="form-check mb-2">
        <input
          type="checkbox"
          id="usePass"
          className="form-check-input"
          checked={options.usePassword}
          onChange={(e) => setOption("usePassword", e.target.checked)}
        />
        <label htmlFor="usePass" className="form-check-label ms-2 fw-bold">
          <i className="fas fa-lock"></i> Proteksi dengan Password
        </label>
      </div>

      {options.usePassword && (
        <input
          type="password"
          className="form-control"
          placeholder="Masukkan password PDF..."
          value={options.password}
          onChange={(e) => setOption("password", e.target.value)}
        />
      )}
    </div>
  );
};

export default SecurityPanel;
