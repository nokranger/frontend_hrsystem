<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://unpkg.com/pdf-lib@1.4.0"></script>
    <script src="https://unpkg.com/@pdf-lib/fontkit@0.0.4"></script>
    <script src="https://unpkg.com/downloadjs@1.4.7"></script>
  </head>

  <body>
    <p>Click the button to embed a custom font and measure text drawn in that font with <code>pdf-lib</code></p>
    <button onclick="embedFontAndMeasureText()">Create PDF</button>
    <p class="small">(Your browser will download the resulting file)</p>
  </body>

  <script>
    const { PDFDocument, rgb } = PDFLib

    async function embedFontAndMeasureText() {
			// Fetch custom font
      const url = 'https://script-app.github.io/font/THSarabunNew.ttf'
      const fontBytes = await fetch(url).then(res => res.arrayBuffer())

      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create()

      // Register the `fontkit` instance
      pdfDoc.registerFontkit(fontkit)

      // Embed our custom font in the document
      const customFont = await pdfDoc.embedFont(fontBytes)

      // Add a blank page to the document
      const page = pdfDoc.addPage()

      // Create a string of text and measure its width and height in our custom font
      const text = 'This is text in an embedded font!หฟฟหฟหห'
      const textSize = 35
      const textWidth = customFont.widthOfTextAtSize(text, textSize)
      const textHeight = customFont.heightAtSize(textSize)

      // Draw the string of text on the page
      page.drawText(text, {
        x: 40,
        y: 450,
        size: textSize,
        font: customFont,
        color: rgb(0, 0.53, 0.71),
      })

      // Draw a box around the string of text
      page.drawRectangle({
        x: 40,
        y: 450,
        width: textWidth,
        height: textHeight,
        borderColor: rgb(1, 0, 0),
        borderWidth: 1.5,
      })

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const urls = URL.createObjectURL(blob);
      window.open(urls, '_blank');

			// Trigger the browser to download the PDF document
    //   download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
    }
  </script>
</html>
<style>
    body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

p {
  font-family: helvetica;
  font-size: 24px;
  text-align: center;
  margin: 25px;
}

.small {
  font-family: helvetica;
  font-size: 18px;
  text-align: center;
  margin: 25px;
}

button {
  background-color: #008CBA;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  font-size: 16px;
}
</style>