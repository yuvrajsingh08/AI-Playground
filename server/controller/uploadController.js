const { supabase } = require("../config/supabase");

exports.uploadPDF = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file provided" });

    const file = req.file;
    const fileName = Date.now() + "-" + file.originalname;

    const { data, error } = await supabase.storage
      .from("documents")
      .upload(fileName, file.buffer, {
        contentType: "application/pdf",
      });

    if (error) return res.status(500).json({ error });

    const { data: publicUrlData } = supabase.storage
      .from("documents")
      .getPublicUrl(fileName);

    return res.json({ url: publicUrlData.publicUrl, path: fileName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
