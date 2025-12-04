const BaseProcessor = require("../../core/BaseProcessor");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

class SplitManipulator extends BaseProcessor {
  async process(inputPath, outputPath, options) {
    console.log("[Split] Processing PDF...");

    // Baca opsi range dari Frontend (contoh: "1-3" atau "5")
    const rangeString = options.range || "1";

    const pdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const totalPages = pdfDoc.getPageCount();

    const newPdf = await PDFDocument.create();

    // Parsing Range Logic (1-based to 0-based index)
    let pageIndices = [];

    if (rangeString.includes("-")) {
      // Format "Start-End" (ex: 1-3)
      const parts = rangeString.split("-");
      let start = parseInt(parts[0]) - 1; // User input 1 = Index 0
      let end = parseInt(parts[1]) - 1;

      // Validasi batas
      if (start < 0) start = 0;
      if (end >= totalPages) end = totalPages - 1;

      for (let i = start; i <= end; i++) {
        pageIndices.push(i);
      }
    } else {
      // Format Single Page (ex: 5)
      let pageNum = parseInt(rangeString) - 1;
      if (pageNum >= 0 && pageNum < totalPages) {
        pageIndices.push(pageNum);
      }
    }

    if (pageIndices.length === 0) {
      throw new Error(
        `Range halaman tidak valid. Total halaman: ${totalPages}`
      );
    }

    // Salin halaman yang dipilih
    const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));

    const buf = await newPdf.save();
    fs.writeFileSync(outputPath, buf);
    return outputPath;
  }
}

module.exports = SplitManipulator;
