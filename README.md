# 🔒 Secure PDF Converter & Editor

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/backend-Node.js-green)
![React](https://img.shields.io/badge/frontend-React_Vite-blue)
![Architecture](https://img.shields.io/badge/architecture-OOP_%26_MVC-orange)

**Secure PDF Converter & Editor** adalah aplikasi berbasis web yang dirancang untuk mengelola dokumen PDF dengan aman dan cerdas. Aplikasi ini dibangun menggunakan prinsip **Object-Oriented Programming (OOP)** yang ketat, menerapkan pola desain seperti *Factory Pattern* dan *Inheritance* untuk skalabilitas sistem.

Proyek ini dikembangkan untuk memenuhi Tugas Besar mata kuliah **Pemrograman Berorientasi Objek (PBO)**.

---

## ✨ Fitur Unggulan

Aplikasi ini memiliki kemampuan manipulasi dokumen tingkat lanjut:

### 1. 🧠 Smart OCR (Optical Character Recognition)
Mengubah gambar (JPG/PNG) menjadi PDF yang teksnya dapat disalin/diedit.
* **Pre-processing Citra:** Menggunakan `sharp` untuk *binarization*, *resizing*, dan *noise removal* guna meningkatkan akurasi hingga 98%.
* **Multi-Language:** Mendukung Bahasa Indonesia dan Inggris.

### 2. 🛡️ Keamanan Dokumen (AES-256)
Enkripsi mandiri menggunakan engine `muhammara`.
* **AES-256 Encryption:** Standar keamanan tinggi untuk melindungi dokumen.
* **Permissions Control:** Membatasi hak akses (Hanya Print, Blokir Copy-Paste/Edit).

### 3. 📂 Konversi Dokumen
Konversi format Office ke PDF dengan mempertahankan tata letak.
* **Word to PDF:** (.docx)
* **Excel to PDF:** (.xlsx)
* **Image to PDF:** (.jpg, .png)

### 4. ✂️ Manipulasi PDF
* **Merge:** Menggabungkan banyak file PDF menjadi satu dokumen urut.
* **Split:** Memecah file PDF berdasarkan rentang halaman tertentu.

---

## 🛠️ Teknologi yang Digunakan

### Backend (Node.js)
* **Core:** Express.js
* **OOP Core:** Class-based Modules (Controllers, Converters, Manipulators).
* **Libraries:**
    * `muhammara`: Manipulasi PDF Low-level & Enkripsi.
    * `tesseract.js`: AI OCR Engine.
    * `sharp`: Image Processing.
    * `pdf-lib`: Pembuatan dokumen PDF.
    * `multer`: Penanganan upload file.

### Frontend (React)
* **Build Tool:** Vite
* **Styling:** Bootstrap 5 & Custom CSS
* **Icons:** FontAwesome
* **State Management:** React Hooks

---

## ⚙️ Prasyarat Instalasi

Sebelum menjalankan aplikasi, pastikan sistem Anda memiliki:

1.  **Node.js** (v16 atau lebih baru)
2.  **LibreOffice** (Wajib diinstall untuk konversi DOCX/XLSX).
    * *Windows:* Install LibreOffice dan pastikan command `soffice` bisa diakses via terminal (tambahkan ke PATH Environment Variable).
    * *Linux:* `sudo apt install libreoffice`
3.  **Python & Build Tools** (Diperlukan untuk install `sharp` & `muhammara` di Windows).
    * Jalankan: `npm install --global --production windows-build-tools` (jika diperlukan).

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Clone Repository
```bash
git clone [https://github.com/username/secure-pdf-converter.git](https://github.com/username/secure-pdf-converter.git)
cd secure-pdf-converter
```
### 2. Setup Backend
```bash
cd backend
npm install
```
# Download data bahasa Tesseract (jika belum otomatis)
# Pastikan file eng.traineddata dan ind.traineddata ada di root backend
Jalankan Server:
```bash
node src/server.js
# Server berjalan di http://localhost:3000
```

### 3.  Setup Frontend
Buka terminal baru:
```bash
cd frontend
npm install
```
Jalankan Client:
```bash
npm run dev
# Aplikasi dapat diakses di http://localhost:5173 (atau port yang muncul di terminal)
```
