import React from 'react';

/**
 * Komponen Button Reusable
 * * @param {React.ReactNode} children - Konten tombol (Teks atau Ikon)
 * @param {string} variant - 'primary', 'secondary', 'danger', atau 'success' (Default: 'primary')
 * @param {string} className - Class CSS tambahan jika diperlukan
 * @param {boolean} disabled - Menonaktifkan tombol jika true
 * @param {function} onClick - Fungsi yang dijalankan saat tombol diklik
 * @param {object} props - Properti HTML button lainnya (seperti type="submit")
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  ...props 
}) => {
  // Menggabungkan class dasar 'btn' dengan variant yang dipilih
  // Contoh hasil: "btn btn-primary custom-class"
  const combinedClassName = `btn btn-${variant} ${className}`;

  return (
    <button 
      className={combinedClassName} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;