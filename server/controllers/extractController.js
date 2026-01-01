const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFile } = require("child_process");
const pdfParse = require("pdf-parse");

/**
 * Helper: run pdftotext (poppler) with input file and capture stdout
 * Returns extracted text or throws error if pdftotext not found or fails.
 */
function pdftotextToString(pdfPath, timeout = 15000) {
  return new Promise((resolve, reject) => {
    // `-layout` preserves more spatial layout, `-enc UTF-8` for encoding, '-' prints to stdout
    const args = ["-layout", "-enc", "UTF-8", pdfPath, "-"];
    execFile("pdftotext", args, { timeout }, (err, stdout, stderr) => {
      if (err) {
        // If pdftotext command not found or non-zero exit
        return reject(err);
      }
      resolve(stdout || "");
    });
  });
}

exports.extractText = async (req, res) => {
  let tmpFilePath = null;
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Missing url in body" });

    console.log("Downloading PDF from:", url);

    // Download the PDF as arraybuffer
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: { "Accept": "application/pdf" },
      timeout: 20000,
    });

    const buffer = Buffer.from(response.data);
    console.log("Downloaded bytes:", buffer.length);

    // Save to a temporary file (pdftotext needs a file)
    const tmpDir = os.tmpdir();
    const tmpName = `pdf-${Date.now()}.pdf`;
    tmpFilePath = path.join(tmpDir, tmpName);
    fs.writeFileSync(tmpFilePath, buffer);
    console.log("Saved PDF to tmp file:", tmpFilePath);

    // 1) Try pdf-parse first (fast, pure JS)
    try {
      const data = await pdfParse(buffer);
      const text = (data && data.text) ? data.text.trim() : "";
      if (text && text.length > 20) { // heuristic: treat small output as empty
        console.log("pdf-parse succeeded, length:", text.length);
        // cleanup
        try { fs.unlinkSync(tmpFilePath); } catch(e) {}
        return res.json({ text });
      }
      console.log("pdf-parse returned empty or very small text. Falling back to pdftotext...");
    } catch (pdfErr) {
      console.warn("pdf-parse failed:", pdfErr && pdfErr.message ? pdfErr.message : pdfErr);
    }

    // 2) Fallback: try pdftotext (Poppler) — more reliable on complex PDFs
    try {
      const pdftxt = await pdftotextToString(tmpFilePath);
      if (pdftxt && pdftxt.trim().length > 0) {
        console.log("pdftotext succeeded, length:", pdftxt.length);
        try { fs.unlinkSync(tmpFilePath); } catch(e) {}
        return res.json({ text: pdftxt });
      } else {
        console.log("pdftotext returned empty text.");
      }
    } catch (popplerErr) {
      console.warn("pdftotext failed:", popplerErr && popplerErr.message ? popplerErr.message : popplerErr);
      // If the error indicates pdftotext not found (ENOENT), handle below
    }

    // If we get here, both methods failed
    // Show sample of file head for debugging (binary header)
    const sample = buffer.slice(0, 200).toString("utf8", 0, 200);
    try { fs.unlinkSync(tmpFilePath); } catch(e) {}

    return res.status(500).json({
      error: "Failed to extract text from PDF using pdf-parse and pdftotext.",
      hint: "If you haven't installed Poppler (pdftotext), install it and add to PATH. See documentation in responses.",
      sampleHead: sample
    });

  } catch (err) {
    console.error("Extraction controller error:", err && err.message ? err.message : err);
    if (tmpFilePath) {
      try { fs.unlinkSync(tmpFilePath); } catch (e) {}
    }
    return res.status(500).json({ error: "Internal error extracting PDF", details: err && err.message ? err.message : err });
  }
};
