// src/core/SecurityHandler.js
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

class SecurityHandler {
    #password; // Private field (Encapsulation)

    constructor(password) {
        this.#password = password;
    }

    async applySecurity(filePath) {
        if (!this.#password) return;

        console.log("[Security] Encrypting PDF with AES-256...");
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Implementasi Enkripsi [cite: 43]
        pdfDoc.encrypt({
            userPassword: this.#password,
            ownerPassword: this.#password,
            permissions: {
                printing: 'highResolution',
                modifying: false,
                copying: false,
            },
        });

        const encryptedBytes = await pdfDoc.save();
        fs.writeFileSync(filePath, encryptedBytes);
    }
}

module.exports = SecurityHandler;