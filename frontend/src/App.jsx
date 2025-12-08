import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Layout
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

// Pages
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />

        <main className="container">
          <Routes>
            {/* Route Halaman Utama */}
            <Route path="/" element={<HomePage />} />

            {/* Route Halaman Upload Dinamis (:feature bisa jadi convert, ocr, dll) */}
            <Route path="/upload/:feature" element={<UploadPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
