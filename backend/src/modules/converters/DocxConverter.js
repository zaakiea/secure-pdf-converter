const BaseProcessor = require("../../core/BaseProcessor");
const mammoth = require("mammoth");
const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");

class DocxConverter extends BaseProcessor {
  async process(inputPath, outputPath) {
    console.log("[DocxConverter] Converting Word document...");
    super.validate(inputPath);

    const result = await mammoth.extractRawText({ path: inputPath });
    let text = result.value;

    // PERBAIKAN: Handle jika teks kosong
    if (!text || text.trim().length === 0) {
      text =
        "[PERINGATAN: Dokumen ini tidak mengandung teks yang bisa diekstrak, atau hanya berisi gambar.]";
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
