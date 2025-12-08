import React from "react";

const MergeTab = ({ files }) => {
  return (
    <div className="tab-content active bg-white p-3 border rounded">
      <h4>
        <i className="fas fa-object-group"></i> Gabung PDF (Merge)
      </h4>
      <p>
        Urutan file di atas menentukan urutan halaman dalam PDF hasil gabungan.
      </p>

      {files.length < 2 && (
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-triangle"></i> Minimal butuh 2 file
          PDF untuk melakukan penggabungan.
        </div>
      )}

      {files.length >= 2 && (
        <div className="alert alert-success">
          <i className="fas fa-check-circle"></i> {files.length} file siap
          digabungkan.
        </div>
      )}
    </div>
  );
};

export default MergeTab;
