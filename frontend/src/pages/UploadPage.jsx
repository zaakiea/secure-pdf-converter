import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UploadArea from "../components/Converter/UploadArea";
import FileList from "../components/Converter/FileList";
import SecurityPanel from "../components/Converter/SecurityPanel";
import ConvertTab from "../components/Converter/TabContents/ConvertTab";
import OcrTab from "../components/Converter/TabContents/OcrTab";
import MergeTab from "../components/Converter/TabContents/MergeTab";
import SplitTab from "../components/Converter/TabContents/SplitTab";
import ProgressBar from "../components/UI/ProgressBar";
import { processFile } from "../services/api";

const UploadPage = () => {
  const { feature } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const [options, setOptions] = useState({
    format: "",
    ocrLanguage: "id",
    splitMode: "range",
    pageRange: "",
    usePassword: false,
    password: "",
  });

  const titles = {
    convert: { title: "Konversi File", icon: "fa-exchange-alt" },
    ocr: { title: "OCR Scanner", icon: "fa-eye" },
    merge: { title: "Gabung PDF", icon: "fa-object-group" },
    split: { title: "Pisah PDF", icon: "fa-cut" },
  };
  const currentFeature = titles[feature] || titles.convert;

  const handleFileUpload = (newFiles) =>
    setFiles((prev) => [...prev, ...newFiles]);
  const handleRemoveFile = (index) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));
  const handleOptionChange = (key, value) =>
    setOptions((prev) => ({ ...prev, [key]: value }));

  const handleProcess = async () => {
    if (files.length === 0)
      return alert("Silakan unggah file terlebih dahulu!");
    if (feature === "convert" && !options.format)
      return alert("Pilih format target dulu!");
    if (feature === "split" && !options.pageRange)
      return alert("Masukkan range halaman!");

    setIsProcessing(true);
    setProgress(10);

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    let operation = feature;
    if (feature === "convert") operation = options.format;

    formData.append("operation", operation);
    if (options.usePassword) formData.append("password", options.password);
    if (feature === "split") formData.append("range", options.pageRange);
    if (feature === "ocr") formData.append("ocr", "true");

    try {
      const blob = await processFile(formData, (percent) =>
        setProgress(percent)
      );
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
      alert("Gagal: " + error);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const isUploadDisabled = feature === "convert" && !options.format;

  return (
    <div className="main-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <button
          onClick={() => navigate("/")}
          className="btn-back"
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          <i className="fas fa-arrow-left"></i> Kembali
        </button>
        <div>
          <h2>
            <i className={`fas ${currentFeature.icon}`}></i>{" "}
            {currentFeature.title}
          </h2>
        </div>
        <div style={{ width: "80px" }}></div>
      </div>

      <div className="card-body">
        <div className="mb-3">
          {feature === "convert" && (
            <ConvertTab
              selectedFormat={options.format}
              onSelectFormat={(fmt) => handleOptionChange("format", fmt)}
            />
          )}
          {feature === "ocr" && (
            <OcrTab options={options} setOption={handleOptionChange} />
          )}
          {feature === "merge" && <MergeTab files={files} />}
          {feature === "split" && (
            <SplitTab options={options} setOption={handleOptionChange} />
          )}
        </div>

        <UploadArea onUpload={handleFileUpload} disabled={isUploadDisabled} />
        <FileList files={files} onRemove={handleRemoveFile} />
        <SecurityPanel options={options} setOption={handleOptionChange} />

        {isProcessing && (
          <ProgressBar progress={progress} text={`Memproses...`} />
        )}

        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={() => setFiles([])}>
            Hapus Semua
          </button>
          <button
            className="btn btn-primary"
            onClick={handleProcess}
            disabled={isProcessing || isUploadDisabled}
          >
            {isProcessing ? "Memproses..." : "Mulai Proses"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
