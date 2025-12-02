// src/modules/converters/OcrConverter.js
const BaseProcessor = require('../../core/BaseProcessor');
const Tesseract = require('tesseract.js');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

class OcrConverter extends BaseProcessor {
    async process(inputPath, outputPath) {
        console.log("[OCR] Starting Intelligent Text Extraction...");
        
        // Memanggil validasi induk (Inheritance)
        super.validate(inputPath);

        // Proses AI (Tesseract) [cite: 37]
        const { data: { text } } = await Tesseract.recognize(inputPath, 'eng');
        console.log(`[OCR] Text detected (${text.length} chars). Generating PDF...`);

        // Buat PDF dari teks
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        page.drawText(text, { x: 50, y: 700, size: 12, color: rgb(0, 0, 0) });

        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPath, pdfBytes);
        
        return outputPath;
    }
}

module.exports = OcrConverter;