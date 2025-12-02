// src/core/BaseProcessor.js
class BaseProcessor {
    constructor() {
        if (this.constructor === BaseProcessor) {
            throw new Error("Abstract class 'BaseProcessor' cannot be instantiated directly.");
        }
    }

    // Abstract Method: Wajib di-override oleh anak kelas
    async process(inputPath, outputPath, options) {
        throw new Error("Method 'process()' must be implemented.");
    }

    // Concrete Method: Validasi dasar (Inheritance) [cite: 72]
    validate(filePath) {
        if (!filePath) throw new Error("File path is required.");
        console.log(`[BaseProcessor] Validating file: ${filePath}`);
        return true;
    }
}

module.exports = BaseProcessor;