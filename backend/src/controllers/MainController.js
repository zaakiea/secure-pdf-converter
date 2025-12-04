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
    let inputData; // Deklarasi di luar try agar bisa diakses di finally/cleanup
    let outputPath;

    try {
      const { operation, password } = req.body;
      // Ambil opsi tambahan (seperti range halaman untuk split)
      const options = req.body;

      const files = req.files || (req.file ? [req.file] : []);

      if (files.length === 0) throw new Error("No files uploaded.");

      let processor;
      outputPath = path.join("output", `result-${Date.now()}.pdf`);

      // Factory Pattern
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
          // Merge butuh array paths
          inputData = files.map((f) => f.path);
          break;
        case "split":
          processor = new SplitManipulator();
          inputData = files[0].path;
          break;
        default:
          throw new Error("Invalid operation: " + operation);
      }

      // PERBAIKAN 1: Kirim 'options' sebagai parameter ke-3 agar SplitManipulator bisa baca range
      await processor.process(inputData, outputPath, options);

      // Security Injection
      if (password) {
        const security = new SecurityHandler(password);
        await security.applySecurity(outputPath);
      }

      // Kirim file ke user
      res.download(outputPath, (err) => {
        if (err) console.error("Download Error:", err);

        // PERBAIKAN 2: Auto Cleanup (Hapus file sampah)
        MainController.cleanup(inputData, outputPath);
      });
    } catch (error) {
      console.error(error);
      // Cleanup jika error terjadi sebelum download
      if (inputData || outputPath)
        MainController.cleanup(inputData, outputPath);

      if (!res.headersSent) res.status(500).json({ error: error.message });
    }
  }

  // Helper untuk hapus file
  static cleanup(inputData, outputPath) {
    try {
      // Hapus Input (Bisa berupa String path atau Array path)
      if (Array.isArray(inputData)) {
        inputData.forEach((p) => {
          if (fs.existsSync(p)) fs.unlinkSync(p);
        });
      } else if (inputData && fs.existsSync(inputData)) {
        fs.unlinkSync(inputData);
      }

      // Hapus Output
      if (outputPath && fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    } catch (e) {
      console.error("Cleanup Error:", e.message);
    }
  }
}

module.exports = MainController;
