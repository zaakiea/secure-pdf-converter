const BaseProcessor = require("../../core/BaseProcessor");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

class XlsxConverter extends BaseProcessor {
  async process(inputPath, outputPath, options) {
    console.log(
      `[XlsxConverter] Mengonversi Excel ke PDF menggunakan LibreOffice...`
    );

    // 1. Validasi
    super.validate(inputPath);

    // 2. Tentukan Folder Output
    const outputDir = path.dirname(outputPath);

    // 3. Tentukan Path LibreOffice (Sesuaikan jika di D:)
    const librePath = "C:\\Program Files\\LibreOffice\\program\\soffice.exe";

    if (!fs.existsSync(librePath)) {
      throw new Error(
        `LibreOffice tidak ditemukan di: ${librePath}. Pastikan sudah diinstall.`
      );
    }

    // 4. Perintah Terminal untuk Excel
    // Sama seperti Word, kita gunakan --convert-to pdf
    const command = `"${librePath}" --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("[XlsxConverter] Exec Error:", error);
          return reject(
            new Error("Gagal menjalankan LibreOffice. Cek log server.")
          );
        }

        // LibreOffice menghasilkan file dengan nama asli + .pdf
        // Contoh: data.xlsx -> data.pdf
        const originalName = path.basename(inputPath, path.extname(inputPath));
        const libreOutput = path.join(outputDir, `${originalName}.pdf`);

        // 5. Rename/Pindahkan ke Output Path yang diminta sistem
        if (fs.existsSync(libreOutput)) {
          // Hapus target lama jika ada
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

          try {
            fs.renameSync(libreOutput, outputPath);
            console.log(
              `[XlsxConverter] Sukses! File tersimpan di: ${outputPath}`
            );
            resolve(outputPath);
          } catch (renameErr) {
            // Fallback jika beda drive/partisi
            fs.copyFileSync(libreOutput, outputPath);
            fs.unlinkSync(libreOutput);
            resolve(outputPath);
          }
        } else {
          reject(
            new Error(
              "File PDF tidak terbentuk. Pastikan file Excel tidak dikunci password."
            )
          );
        }
      });
    });
  }
}

module.exports = XlsxConverter;
