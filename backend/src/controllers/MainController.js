// src/controllers/MainController.js
const OcrConverter = require('../modules/converters/OcrConverter');
const MergeManipulator = require('../modules/manipulators/MergeManipulator');
const SecurityHandler = require('../core/SecurityHandler');
const path = require('path');

class MainController {
    static async handleRequest(req, res) {
        try {
            const { operation, password } = req.body;
            const files = req.files || [req.file];
            
            if (!files) throw new Error("No files uploaded.");

            let processor;
            let inputData;
            const outputPath = path.join('output', `result-${Date.now()}.pdf`);

            // Factory Pattern: Menentukan Processor [cite: 87]
            switch (operation) {
                case 'ocr':
                    processor = new OcrConverter();
                    inputData = files[0].path;
                    break;
                case 'merge':
                    processor = new MergeManipulator();
                    inputData = files.map(f => f.path);
                    break;
                default:
                    throw new Error("Invalid operation");
            }

            // Polymorphism: Panggil .process() tanpa peduli tipe objeknya [cite: 75, 90]
            await processor.process(inputData, outputPath);

            // Security Injection [cite: 91]
            if (password) {
                const security = new SecurityHandler(password);
                await security.applySecurity(outputPath);
            }

            res.download(outputPath);

        } catch (error) {
            // Exception Handling [cite: 79]
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MainController;