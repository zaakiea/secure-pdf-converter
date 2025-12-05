const BaseProcessor = require("../../core/BaseProcessor");
const mammoth = require("mammoth");
const puppeteer = require("puppeteer"); // Library browser virtual
const fs = require("fs");

class DocxConverter extends BaseProcessor {
  async process(inputPath, outputPath) {
    console.log(
      "[DocxConverter] Converting Word document with layout preservation..."
    );

    // 1. Validasi File
    super.validate(inputPath);

    // 2. Konversi DOCX ke HTML (Mengambil layout, tabel, gambar)
    // convertToHtml jauh lebih baik daripada extractRawText
    const result = await mammoth.convertToHtml({ path: inputPath });
    const htmlContent = result.value;

    if (!htmlContent) {
      throw new Error("Gagal membaca konten dokumen Word.");
    }

    // 3. Styling CSS: Membuat tampilan HTML mirip dokumen cetak A4
    const finalHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: 'Times New Roman', serif; /* Font standar dokumen resmi */
                        font-size: 12pt;
                        line-height: 1.5;
                        color: #000;
                        background: #fff;
                        padding: 0;
                        margin: 0;
                    }
                    /* Layout Dokumen */
                    h1, h2, h3, h4 { font-family: Arial, sans-serif; margin-top: 1em; margin-bottom: 0.5em; font-weight: bold; }
                    p { margin-bottom: 10px; text-align: justify; }
                    
                    /* Styling TABEL agar garisnya muncul */
                    table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin: 20px 0; 
                        page-break-inside: avoid; /* Jangan potong tabel di tengah halaman */
                    }
                    th, td { 
                        border: 1px solid #000; 
                        padding: 8px; 
                        text-align: left; 
                        vertical-align: top; 
                    }
                    
                    /* Styling GAMBAR agar rapi dan tidak lewat margin */
                    img { 
                        max-width: 100%; 
                        height: auto; 
                        display: block; 
                        margin: 15px auto; 
                    }
                    
                    /* Styling List (Bullet Points) */
                    ul, ol { margin-left: 20px; padding-left: 20px; }
                </style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
        `;

    // 4. Proses Rendering PDF menggunakan Puppeteer
    // Kita menyalakan browser "headless" (di balik layar)
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"], // Opsi keamanan standar server
    });
    const page = await browser.newPage();

    // Masukkan HTML ke halaman browser
    await page.setContent(finalHtml, {
      waitUntil: "networkidle0", // Tunggu sampai semua gambar selesai dimuat
    });

    // Cetak ke PDF (Simulasi Printer)
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true, // Cetak background (penting untuk gambar)
      margin: {
        top: "2.54cm", // Margin atas standar Word (1 inci)
        bottom: "2.54cm", // Margin bawah
        left: "2.54cm", // Margin kiri
        right: "2.54cm", // Margin kanan
      },
    });

    await browser.close();

    // 5. Simpan Hasil PDF
    fs.writeFileSync(outputPath, pdfBuffer);

    console.log(
      "[DocxConverter] Success converting Docx to PDF (Layout Preserved)."
    );
    return outputPath;
  }
}

module.exports = DocxConverter;
