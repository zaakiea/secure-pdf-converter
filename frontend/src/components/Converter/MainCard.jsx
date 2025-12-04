import React, { useState } from "react";
import UploadArea from "./UploadArea";
import FileList from "./FileList";
import SecurityPanel from "./SecurityPanel";
import ConvertTab from "./TabContents/ConvertTab";
import OcrTab from "./TabContents/OcrTab";
import MergeTab from "./TabContents/MergeTab";
import SplitTab from "./TabContents/SplitTab";
import ProgressBar from "../UI/ProgressBar";
import { processFile } from "../../services/api";

const MainCard = () => {
  const [activeTab, setActiveTab] = useState("convert");
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Global State untuk Opsi (dikirim ke TabContents)
  const [options, setOptions] = useState({
    format: "", // convert
    ocrLanguage: "id", // ocr
    ocrAccuracy: "medium", // ocr
    splitMode: "range", // split
    pageRange: "", // split
    usePassword: false, // security
    password: "", // security
    autoDelete: true, // security
  });

  const handleFileUpload = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOptionChange = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleProcess = async () => {
    if (files.length === 0)
      return alert("Silakan unggah file terlebih dahulu!");

    // Validasi logic sederhana
    if (activeTab === "convert" && !options.format)
      return alert("Pilih format target dulu!");
    if (activeTab === "split" && !options.pageRange)
      return alert("Masukkan range halaman (cth: 1-3)!");

    setIsProcessing(true);
    setProgress(10); // Mulai progress

    const formData = new FormData();

    // 1. Masukkan File
    files.forEach((file) => {
      formData.append("files", file);
    });

    // 2. Tentukan Operasi (Mapping UI ke Backend logic)
    let operation = activeTab;
    if (activeTab === "convert") operation = options.format; // docx, xlsx, image

    formData.append("operation", operation);

    // 3. Masukkan Opsi Tambahan
    if (options.usePassword) formData.append("password", options.options);
    if (activeTab === "split") formData.append("range", options.pageRange);
    if (activeTab === "ocr") formData.append("ocr", "true"); // Penanda khusus OCR

    try {
      // Panggil API (Real Backend)
      const blob = await processFile(formData, (percent) => {
        setProgress(percent);
      });

      // Download Otomatis
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Result_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      alert("Berhasil! File sedang diunduh.");
    } catch (error) {
      console.error(error);
      alert("Gagal memproses: " + error);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="main-card">
      <div className="card-header">
        <h2>
          <i className="fas fa-cogs"></i> Secure PDF Converter & Editor
        </h2>
        <p>Unggah file Anda dan pilih operasi yang diinginkan</p>
      </div>

      <div className="card-body">
        {/* Tabs Navigation */}
        <div className="tabs">
          {[
            { id: "convert", label: "Konversi", icon: "fa-exchange-alt" },
            { id: "ocr", label: "OCR", icon: "fa-eye" },
            { id: "merge", label: "Merge", icon: "fa-object-group" },
            { id: "split", label: "Split", icon: "fa-cut" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`fas ${tab.icon}`}></i> {tab.label}
            </button>
          ))}
        </div>

        {/* Upload & File List */}
        <UploadArea onUpload={handleFileUpload} />
        <FileList files={files} onRemove={handleRemoveFile} />

        {/* Tab Contents (Conditional Rendering) */}
        <div className="tab-content-container mb-2">
          {activeTab === "convert" && (
            <ConvertTab
              selectedFormat={options.format}
              onSelectFormat={(fmt) => handleOptionChange("format", fmt)}
            />
          )}
          {activeTab === "ocr" && (
            <OcrTab options={options} setOption={handleOptionChange} />
          )}
          {activeTab === "merge" && <MergeTab files={files} />}
          {activeTab === "split" && (
            <SplitTab options={options} setOption={handleOptionChange} />
          )}
        </div>

        <SecurityPanel options={options} setOption={handleOptionChange} />

        {isProcessing && (
          <ProgressBar progress={progress} text={`Memproses ${activeTab}...`} />
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={() => setFiles([])}>
            <i className="fas fa-trash"></i> Hapus Semua
          </button>
          <button
            className="btn btn-primary"
            onClick={handleProcess}
            disabled={isProcessing}
          >
            {isProcessing ? (
              "Memproses..."
            ) : (
              <>
                <i className="fas fa-play"></i> Mulai Proses
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
