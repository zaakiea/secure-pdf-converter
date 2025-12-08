const BaseProcessor = require("../../core/BaseProcessor");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

class ImageConverter extends BaseProcessor {
  async process(inputPath, outputPath, options) {
    console.log(
      `[ImageConverter] Mengonversi Gambar (Universal) ke PDF menggunakan LibreOffice...`
    );

    // 1. Validasi File
    super.validate(inputPath);

    // 2. Tentukan Folder Output
    const outputDir = path.dirname(outputPath);

    // 3. Tentukan Path LibreOffice (Pastikan sama dengan modul Word/Excel)
    const librePath = "C:\\Program Files\\LibreOffice\\program\\soffice.exe";

    if (!fs.existsSync(librePath)) {
      throw new Error(
        `LibreOffice tidak ditemukan di: ${librePath}. Pastikan sudah diinstall.`
      );
    }

    // 4. Perintah Terminal untuk Gambar
    // LibreOffice Draw akan menangani file gambar (BMP, GIF, TIFF, PNG, JPG, WebP, SVG, dll)
    const command = `"${librePath}" --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("[ImageConverter] Exec Error:", error);
          return reject(
            new Error(
              "Gagal konversi gambar. File mungkin rusak atau format tidak didukung LibreOffice."
            )
          );
        }

        // LibreOffice menghasilkan nama file asli + .pdf
        // Contoh: "foto.webp" -> "foto.pdf"
        const originalName = path.basename(inputPath, path.extname(inputPath));
        const libreOutput = path.join(outputDir, `${originalName}.pdf`);

        // 5. Rename ke Output Path sistem
        if (fs.existsSync(libreOutput)) {
          // Hapus target lama jika ada (overwrite)
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

          try {
            fs.renameSync(libreOutput, outputPath);
            console.log(
              `[ImageConverter] Sukses! File tersimpan di: ${outputPath}`
            );
            resolve(outputPath);
          } catch (renameErr) {
            // Fallback copy jika rename gagal
            fs.copyFileSync(libreOutput, outputPath);
            fs.unlinkSync(libreOutput);
            resolve(outputPath);
          }
        } else {
          reject(
            new Error("File PDF tidak terbentuk. Pastikan format gambar valid.")
          );
        }
      });
    });
  }
}

module.exports = ImageConverter;
