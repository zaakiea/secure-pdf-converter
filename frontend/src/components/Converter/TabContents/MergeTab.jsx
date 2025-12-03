import React from 'react';

const MergeTab = ({ files }) => {
  return (
    <div className="tab-content active">
      <h3 className="mb-2">Gabungkan PDF</h3>
      <p>File akan digabungkan sesuai urutan di bawah ini.</p>
      
      {files.length === 0 ? (
        <p className="text-center text-muted">Belum ada file yang dipilih untuk digabungkan.</p>
      ) : (
        <div className="file-list-preview">
          {/* Disini bisa ditambahkan fitur drag-drop reordering jika sempat */}
          <p>Urutan File:</p>
          <ol style={{ marginLeft: '1.5rem' }}>
            {files.map((f, i) => <li key={i}>{f.name}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
};

export default MergeTab;