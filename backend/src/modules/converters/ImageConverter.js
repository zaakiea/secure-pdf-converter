const BaseProcessor = require("../../core/BaseProcessor");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

class ImageConverter extends BaseProcessor {
  async process(inputPath, outputPath) {
    console.log("[ImageConverter] Embedding image to PDF...");
    super.validate(inputPath);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Baca gambar
    const imageBytes = fs.readFileSync(inputPath);
    let image;

    // Cek header file untuk menentukan JPG atau PNG
    // (Sederhananya kita coba embedJpg, kalau gagal coba embedPng)
    try {
      image = await pdfDoc.embedJpg(imageBytes);
    } catch (e) {
      image = await pdfDoc.embedPng(imageBytes);
    }

    // Sesuaikan ukuran gambar agar muat di A4
    const imgDims = image.scaleToFit(width - 100, height - 100);

    page.drawImage(image, {
      x: 50,
      y: height - imgDims.height - 50,
      width: imgDims.width,
      height: imgDims.height,
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    return outputPath;
  }
}

module.exports = ImageConverter;
