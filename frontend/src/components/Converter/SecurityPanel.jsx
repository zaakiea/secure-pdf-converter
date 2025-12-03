import React from 'react';

const SecurityPanel = ({ options, setOption }) => {
  return (
    <div className="security-options">
      <h4><i className="fas fa-lock"></i> Opsi Keamanan</h4>
      
      <div className="form-group">
        <label>
          <input 
            type="checkbox" 
            checked={options.usePassword} 
            onChange={(e) => setOption('usePassword', e.target.checked)}
          /> Tambahkan Password
        </label>
      </div>

      {options.usePassword && (
        <div className="password-fields">
          <div className="form-group">
            <label>Password PDF</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Masukkan password"
              value={options.password}
              onChange={(e) => setOption('password', e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="form-group">
        <label>
          <input 
            type="checkbox" 
            checked={options.autoDelete} 
            onChange={(e) => setOption('autoDelete', e.target.checked)}
          /> Hapus file otomatis setelah 5 menit
        </label>
      </div>
    </div>
  );
};

export default SecurityPanel;