const BaseProcessor = require("../../core/BaseProcessor");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

class DocxConverter extends BaseProcessor {
  async process(inputPath, outputPath, options) {
    console.log(
      `[DocxConverter] Converting Word to PDF using Direct LibreOffice Call...`
    );

    // 1. Validasi
    super.validate(inputPath);

    // 2. Tentukan Folder Output (LibreOffice butuh folder, bukan nama file target)
    // Kita gunakan folder yang sama dengan outputPath ('output/')
    const outputDir = path.dirname(outputPath);

    // 3. Tentukan Path LibreOffice Secara Manual
    // Cek path default Windows. Jika Anda install di D:, sesuaikan path ini.
    const librePath = "C:\\Program Files\\LibreOffice\\program\\soffice.exe";

    // Cek apakah file exe benar-benar ada
    if (!fs.existsSync(librePath)) {
      throw new Error(
        `LibreOffice tidak ditemukan di: ${librePath}. Pastikan sudah diinstall.`
      );
    }

    // 4. Susun Perintah Terminal
    // Perintah: "path/to/soffice" --headless --convert-to pdf --outdir "folder/output" "file/input.docx"
    const command = `"${librePath}" --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;

    return new Promise((resolve, reject) => {
      // Jalankan perintah terminal
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("[DocxConverter] Exec Error:", error);
          return reject(
            new Error("Gagal menjalankan LibreOffice. Cek log server.")
          );
        }

        // LibreOffice akan menghasilkan file dengan nama ASLI tapi ekstensi .pdf
        // Contoh: input "laporan.docx" -> output "laporan.pdf"
        const originalName = path.basename(inputPath, path.extname(inputPath));
        const libreOutput = path.join(outputDir, `${originalName}.pdf`);

        // 5. Rename ke nama target yang diminta sistem (result-TIMESTAMP.pdf)
        if (fs.existsSync(libreOutput)) {
          // Hapus file target lama jika ada (overwrite)
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

          try {
            fs.renameSync(libreOutput, outputPath);
            console.log(
              `[DocxConverter] Sukses! File tersimpan di: ${outputPath}`
            );
            resolve(outputPath);
          } catch (renameErr) {
            // Fallback: Jika rename gagal (misal beda drive), copy lalu hapus
            fs.copyFileSync(libreOutput, outputPath);
            fs.unlinkSync(libreOutput);
            resolve(outputPath);
          }
        } else {
          reject(
            new Error(
              "File PDF tidak terbentuk. Mungkin dokumen korup atau dipassword."
            )
          );
        }
      });
    });
  }
}

module.exports = DocxConverter;
