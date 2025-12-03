const BaseProcessor = require("../../core/BaseProcessor");
const mammoth = require("mammoth");
const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");

class DocxConverter extends BaseProcessor {
  async process(inputPath, outputPath) {
    console.log("[DocxConverter] Converting Word document...");

    // 1. Validasi (Inheritance dari Parent)
    super.validate(inputPath);

    // 2. Baca file Word dan ekstrak teks mentahnya (Raw Text)
    // (Catatan: Konversi format full layout sangat sulit di Node.js murni,
    // jadi kita ambil teksnya untuk dijadikan PDF sebagai demo PBO)
    const result = await mammoth.extractRawText({ path: inputPath });
    const text = result.value; // Teks asli dari Word

    if (!text) {
      throw new Error("Gagal membaca teks dari file Word.");
    }

    // 3. Buat PDF baru berisi teks tersebut
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    // Tulis teks ke PDF (Simple Wrap)
    page.drawText(text.substring(0, 2000), {
      // Batasi karakter demo
      x: 50,
      y: height - 50,
      size: fontSize,
      color: rgb(0, 0, 0),
      maxWidth: width - 100,
      lineHeight: 14,
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    console.log("[DocxConverter] Success converting Docx to PDF.");
    return outputPath;
  }
}

module.exports = DocxConverter;
