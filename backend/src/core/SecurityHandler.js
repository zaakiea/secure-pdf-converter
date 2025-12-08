const muhammara = require("muhammara");
const fs = require("fs");

class SecurityHandler {
  #password;

  constructor(password) {
    this.#password = password;
  }

  /**
   * Menerapkan enkripsi dan mengembalikan path file baru.
   * Tidak menghapus file lama untuk menghindari EBUSY error.
   */
  async applySecurity(filePath) {
    // Jika tidak ada password, kembalikan path asli
    if (!this.#password) return filePath;

    console.log("[Security] Memulai enkripsi PDF (Engine: Muhammara)...");

    // Buat nama file output baru
    const secureOutput = filePath.replace(".pdf", "_secure.pdf");

    return new Promise((resolve, reject) => {
      try {
        // Recipe(Input, Output) -> Membaca Input, Menulis ke Output baru
        const pdfDoc = new muhammara.Recipe(filePath, secureOutput);

        pdfDoc.encrypt({
          userPassword: this.#password,
          ownerPassword: this.#password,
          userProtectionFlag: 4, // Hanya print, no copy/edit
        });

        // endPDF selesai, file input otomatis dilepas lock-nya oleh OS (tapi butuh waktu ms)
        pdfDoc.endPDF(() => {
          console.log(
            "[Security] Sukses! File terenkripsi dibuat:",
            secureOutput
          );
          // Kita resolve path file BARU, biarkan Controller menghapus file LAMA
          resolve(secureOutput);
        });
      } catch (error) {
        console.error("[Security] Gagal mengenkripsi:", error);
        if (fs.existsSync(secureOutput)) fs.unlinkSync(secureOutput);
        reject(error);
      }
    });
  }
}

module.exports = SecurityHandler;
