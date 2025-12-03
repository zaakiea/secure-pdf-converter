// src/controllers/MainController.js
const OcrConverter = require("../modules/converters/OcrConverter");
const DocxConverter = require("../modules/converters/DocxConverter");
const XlsxConverter = require("../modules/converters/XlsxConverter");
const ImageConverter = require("../modules/converters/ImageConverter");
const MergeManipulator = require("../modules/manipulators/MergeManipulator");
const SplitManipulator = require("../modules/manipulators/SplitManipulator");
const SecurityHandler = require("../core/SecurityHandler");
const path = require("path");

class MainController {
  static async handleRequest(req, res) {
    try {
      const { operation, password } = req.body;
      const files = req.files || [req.file];

      if (!files || files.length === 0) throw new Error("No files uploaded.");

      let processor;
      let inputData;
      const outputPath = path.join("output", `result-${Date.now()}.pdf`);

      // Factory Pattern Lengkap
      switch (operation) {
        case "ocr":
          processor = new OcrConverter();
          inputData = files[0].path;
          break;
        case "docx":
          processor = new DocxConverter();
          inputData = files[0].path;
          break;
        case "xlsx": // <--- Tambahan Excel
          processor = new XlsxConverter();
          inputData = files[0].path;
          break;
        case "image": // <--- Tambahan Image Biasa
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

      await processor.process(inputData, outputPath);

      if (password) {
        const security = new SecurityHandler(password);
        await security.applySecurity(outputPath);
      }

      res.download(outputPath);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MainController;
