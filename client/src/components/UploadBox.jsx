import { useState } from "react";
import Loader from "./Loader";

const API_URL = import.meta.env.VITE_API_URL;

export default function UploadBox({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // 👈 progress text

  const handleProcess = async () => {
    if (!file) {
      alert("Select a PDF");
      return;
    }

    try {
      setLoading(true);
      setStatus("Uploading PDF...");

      // 1️⃣ Upload PDF
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        throw new Error(uploadData.error || "Upload failed");
      }

      const fileUrl = uploadData.url;

      // 2️⃣ Extract text
      setStatus("Extracting text...");

      const extractRes = await fetch(`${API_URL}/extract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: fileUrl }),
      });

      const extractData = await extractRes.json();
      if (!extractRes.ok) {
        throw new Error(extractData.error || "Extraction failed");
      }

      // 3️⃣ Analyze with AI
      setStatus("Analyzing with AI...");

      const analyzeRes = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: extractData.text }),
      });

      const analyzeData = await analyzeRes.json();
      if (!analyzeRes.ok) {
        throw new Error(analyzeData.details || "AI analysis failed");
      }

      setResult(analyzeData);
      setStatus("Done ✅");

    } catch (err) {
      console.error("Frontend error:", err);
      alert(err.message); // 👈 show real backend error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleProcess}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Analyze PDF"}
      </button>

      {loading && (
        <>
          <Loader />
          <p className="text-sm text-gray-600 mt-2">{status}</p>
        </>
      )}
    </div>
  );
}
