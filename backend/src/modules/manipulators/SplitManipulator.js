const BaseProcessor = require('../../core/BaseProcessor');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

class SplitManipulator extends BaseProcessor {
    async process(inputPath, outputPath, options) {
        // options.range bisa berupa string "1-3" atau "2"
        console.log("[Split] Splitting PDF...");
        
        // Baca file PDF asli
        const pdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        
        // Buat dokumen PDF baru
        const newPdf = await PDFDocument.create();
        
        // Logika parsing range sederhana (contoh: ambil halaman 0 sampai 1)
        // Di tugas nyata, Anda perlu parsing string "1-5" menjadi array index
        const rangeStart = 0; 
        const rangeEnd = 1; 
        
        const copiedPages = await newPdf.copyPages(pdfDoc, [rangeStart, rangeEnd]);
        copiedPages.forEach((page) => newPdf.addPage(page));

        const buf = await newPdf.save();
        fs.writeFileSync(outputPath, buf);
        return outputPath;
    }
}

module.exports = SplitManipulator;