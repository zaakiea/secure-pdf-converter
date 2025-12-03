const BaseProcessor = require("../../core/BaseProcessor");
const XLSX = require("xlsx");
const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");

class XlsxConverter extends BaseProcessor {
  async process(inputPath, outputPath) {
    console.log("[XlsxConverter] Converting Excel sheet...");
    super.validate(inputPath);

    // 1. Baca File Excel
    const workbook = XLSX.readFile(inputPath);
    const sheetName = workbook.SheetNames[0]; // Ambil sheet pertama
    const worksheet = workbook.Sheets[sheetName];

    // 2. Ubah ke Teks (CSV format sederhana)
    const csvData = XLSX.utils.sheet_to_csv(worksheet);

    // 3. Buat PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Tulis data Excel ke PDF
    page.drawText(csvData.substring(0, 3000), {
      // Batas karakter demo
      x: 50,
      y: height - 50,
      size: 10,
      color: rgb(0, 0, 0),
      maxWidth: width - 100,
      lineHeight: 12,
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    return outputPath;
  }
}

module.exports = XlsxConverter;
