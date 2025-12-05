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

    // Baca buffer gambar
    const imageBytes = fs.readFileSync(inputPath);
    let image;

    // DETEKSI FORMAT MENGGUNAKAN MAGIC BYTES
    // Ini lebih akurat daripada sekadar try-catch
    if (this.isPng(imageBytes)) {
      try {
        image = await pdfDoc.embedPng(imageBytes);
      } catch (e) {
        console.error("PNG Error:", e);
        throw new Error("File PNG rusak atau format tidak didukung.");
      }
    } else if (this.isJpg(imageBytes)) {
      try {
        image = await pdfDoc.embedJpg(imageBytes);
      } catch (e) {
        console.error("JPG Error:", e);
        throw new Error("File JPG rusak atau format tidak didukung.");
      }
    } else {
      // Jika bukan JPG/PNG (misal: WebP, GIF, BMP)
      throw new Error(
        "Format gambar tidak didukung! Harap gunakan file JPG atau PNG."
      );
    }

    // Skala gambar agar muat dalam halaman A4
    // Mengurangi sedikit margin (100 unit)
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

  /**
   * Cek apakah buffer adalah PNG
   * Signature PNG: 89 50 4E 47
   */
  isPng(buffer) {
    if (!buffer || buffer.length < 8) return false;
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  /**
   * Cek apakah buffer adalah JPG/JPEG
   * Signature JPG: FF D8 FF
   */
  isJpg(buffer) {
    if (!buffer || buffer.length < 3) return false;
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
}

module.exports = ImageConverter;
