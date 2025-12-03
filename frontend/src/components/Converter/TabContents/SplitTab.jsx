import React from 'react';

const SplitTab = ({ options, setOption }) => {
  return (
    <div className="tab-content active">
      <h3 className="mb-2">Pisahkan PDF</h3>
      <p>Pilih halaman yang ingin dipisahkan.</p>
      
      <div className="security-options mt-2">
        <div className="form-group">
          <label>Mode Pemotongan</label>
          <select 
            className="form-control"
            value={options.splitMode}
            onChange={(e) => setOption('splitMode', e.target.value)}
          >
            <option value="range">Berdasarkan Rentang Halaman</option>
            <option value="single">Setiap Halaman Terpisah</option>
          </select>
        </div>
        
        {options.splitMode === 'range' && (
          <div className="form-group">
            <label>Rentang Halaman</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Contoh: 1-5, 8, 10-12"
              value={options.pageRange}
              onChange={(e) => setOption('pageRange', e.target.value)}
            />
            <small>Gunakan koma untuk memisahkan rentang (misal: 1-3, 5)</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitTab;