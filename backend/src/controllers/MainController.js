const OcrConverter = require("../modules/converters/OcrConverter");
const DocxConverter = require("../modules/converters/DocxConverter");
const XlsxConverter = require("../modules/converters/XlsxConverter");
const ImageConverter = require("../modules/converters/ImageConverter");
const MergeManipulator = require("../modules/manipulators/MergeManipulator");
const SplitManipulator = require("../modules/manipulators/SplitManipulator");
const SecurityHandler = require("../core/SecurityHandler");
const path = require("path");
const fs = require("fs");

class MainController {
  static async handleRequest(req, res) {
    let inputData;
    let initialOutputPath; // Output dari konverter (misal: docx -> pdf)
    let finalOutputPath; // Output final (bisa sama, atau beda jika dienkripsi)

    try {
      const { operation, password } = req.body;
      const options = req.body;

      const files = req.files || (req.file ? [req.file] : []);
      if (files.length === 0) throw new Error("No files uploaded.");

      // Pastikan folder output ada
      if (!fs.existsSync("output")) fs.mkdirSync("output");

      // 1. Tentukan Processor
      let processor;
      // Gunakan timestamp unik untuk nama file
      initialOutputPath = path.join("output", `result-${Date.now()}.pdf`);

      switch (operation) {
        case "ocr":
          processor = new OcrConverter();
          inputData = files[0].path;
          break;
        case "docx":
          processor = new DocxConverter();
          inputData = files[0].path;
          break;
        case "xlsx":
          processor = new XlsxConverter();
          inputData = files[0].path;
          break;
        case "image":
          processor = new ImageConverter();
          inputData = files[0].path;
          break;
        case "merge":
          processor = new MergeManipulator();
          inputData = files.map((f) => f.path);
          break;
        case "split":
          processor = new SplitManipulator();
          inputData = files[0].path;
          break;
        default:
          throw new Error("Invalid operation: " + operation);
      }

      // 2. Proses Utama (Generate PDF Awal)
      await processor.process(inputData, initialOutputPath, options);

      // Default: Final output adalah hasil konversi
      finalOutputPath = initialOutputPath;

      // 3. Security Layer (Opsional)
      if (password && password.trim() !== "") {
        const security = new SecurityHandler(password);
        // SecurityHandler sekarang mengembalikan path file BARU (_secure.pdf)
        finalOutputPath = await security.applySecurity(initialOutputPath);
      }

      // 4. Kirim File Final ke User
      res.download(finalOutputPath, (err) => {
        if (err) console.error("Download Error:", err);

        // 5. Cleanup Semua File (Input, Intermediate, Final)
        MainController.cleanup(inputData, initialOutputPath, finalOutputPath);
      });
    } catch (error) {
      console.error(error);
      // Cleanup jika error
      MainController.cleanup(inputData, initialOutputPath, finalOutputPath);
      if (!res.headersSent) res.status(500).json({ error: error.message });
    }
  }

  // Helper Cleanup yang Lebih Aman
  static cleanup(inputData, file1, file2) {
    const deleteSafely = (filePath) => {
      if (filePath && fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn(
            `[Cleanup Warning] Gagal menghapus ${filePath}: ${e.message}`
          );
        }
      }
    };

    // Hapus Input Uploads
    if (Array.isArray(inputData)) {
      inputData.forEach(deleteSafely);
    } else {
      deleteSafely(inputData);
    }

    // Hapus Output Files
    deleteSafely(file1); // File hasil konversi (unencrypted)

    // Hapus file2 hanya jika path-nya beda dari file1 (untuk menghindari double delete)
    if (file2 !== file1) {
      deleteSafely(file2); // File hasil enkripsi
    }
  }
}

module.exports = MainController;
