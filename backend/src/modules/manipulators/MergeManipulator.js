// src/modules/manipulators/MergeManipulator.js
const BaseProcessor = require('../../core/BaseProcessor');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

class MergeManipulator extends BaseProcessor {
    // Override method process
    async process(inputPaths, outputPath) {
        console.log("[Merge] Combining multiple PDFs...");
        
        const mergedPdf = await PDFDocument.create();

        for (const path of inputPaths) {
            const pdfBytes = fs.readFileSync(path);
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const buf = await mergedPdf.save();
        fs.writeFileSync(outputPath, buf);
        return outputPath;
    }
}

module.exports = MergeManipulator;