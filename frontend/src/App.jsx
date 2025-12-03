import React, { useEffect } from 'react';

// 1. Import CSS
// Pastikan Anda sudah menyalin semua CSS ke dalam file src/App.css
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// 2. Import Komponen dari folder masing-masing
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FeaturesGrid from './components/Dashboard/FeaturesGrid';
import SystemInfo from './components/Dashboard/SystemInfo';
// Pastikan nama file Anda MainCard.jsx, jika MainConverter.jsx sesuaikan import ini
import MainCard from './components/Converter/MainCard'; 

function App() {
  return (
    <div className="app-container">
      {/* Header dari components/Layout/Header.jsx */}
      <Header />
      
      <main className="container">
        {/* FeaturesGrid dari components/Dashboard/FeaturesGrid.jsx */}
        <FeaturesGrid />
        
        {/* MainCard adalah komponen utama konverter */}
        <MainCard />
        
        {/* SystemInfo dari components/Dashboard/SystemInfo.jsx */}
        <SystemInfo />
      </main>
      
      {/* Footer dari components/Layout/Footer.jsx */}
      <Footer />
    </div>
  );
}

export default App;