const BaseProcessor = require("../../core/BaseProcessor");
const { createWorker } = require("tesseract.js");
const sharp = require("sharp"); // Library pemrosesan citra super cepat
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");

class OcrConverter extends BaseProcessor {
  async process(inputPath, outputPath, options) {
    console.log("[OCR] Memulai Sistem Cerdas Ekstraksi Teks...");
    super.validate(inputPath);

    let worker;
    try {
      // 1. IMAGE PRE-PROCESSING (Rahasia Akurasi Tinggi)
      // Kita bersihkan gambar dulu sebelum dibaca Tesseract
      console.log("[OCR] Pre-processing citra (Penajaman & Binarisasi)...");

      const processedBuffer = await sharp(inputPath)
        .grayscale() // Ubah ke abu-abu (hilangkan noise warna)
        .resize(2000, null, {
          // Perbesar resolusi (width 2000px) agar teks kecil terbaca
          fit: "inside",
          withoutEnlargement: false,
        })
        .sharpen() // Tajamkan tepi huruf
        .normalize() // Ratakan kontras
        .threshold(128) // Binarisasi (Ubah jadi Hitam & Putih mutlak)
        .toBuffer();

      // 2. Inisialisasi Worker Tesseract (AI OCR)
      // Kita load bahasa Inggris (eng) dan Indonesia (ind)
      worker = await createWorker("eng+ind");

      // 3. Ekstraksi Teks dari gambar yang sudah bersih
      console.log("[OCR] Sedang memindai teks...");
      const {
        data: { text },
      } = await worker.recognize(processedBuffer);

      console.log(`[OCR] Teks terdeteksi: ${text.length} karakter.`);

      if (!text || text.trim().length === 0) {
        throw new Error(
          "Tidak ada teks yang terbaca. Pastikan gambar jelas dan berisi tulisan."
        );
      }

      // 4. Generate PDF Baru
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Logika Pagination Sederhana (Text Wrapping)
      // Karena PDF tidak otomatis pindah halaman, kita hitung manual
      const fontSize = 11;
      const margin = 50;
      const lineHeight = 14;
      const pageHeight = 842; // Ukuran A4

      // Bersihkan teks dari karakter aneh
      const cleanText = text.replace(/[^\x20-\x7E\n\r\t]/g, "");
      const lines = cleanText.split("\n");

      let page = pdfDoc.addPage();
      let y = pageHeight - margin;

      for (const line of lines) {
        // Jika halaman penuh, buat halaman baru
        if (y < margin) {
          page = pdfDoc.addPage();
          y = pageHeight - margin;
        }

        // Tulis baris (sederhana)
        // Catatan: Untuk hasil sempurna butuh library text-wrapper kompleks,
        // tapi ini cukup untuk Tugas Besar.
        try {
          page.drawText(line, {
            x: margin,
            y: y,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
            maxWidth: 500, // Lebar area teks
          });
          y -= lineHeight;
        } catch (e) {
          // Abaikan karakter yang tidak didukung font standar
        }
      }

      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync(outputPath, pdfBytes);

      console.log("[OCR] Sukses! PDF Teks berhasil dibuat.");
      return outputPath;
    } catch (error) {
      console.error("[OCR] Error:", error);
      throw error;
    } finally {
      if (worker) {
        await worker.terminate(); // Wajib matikan worker agar RAM tidak bocor
      }
    }
  }
}

module.exports = OcrConverter;
