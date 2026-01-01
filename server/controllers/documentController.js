const { supabase } = require("../config/supabase");

exports.saveDocument = async (req, res) => {
  try {
    const {
      user_id,
      file_url,
      summary,
      insights,
      topics,
      faqs,
      recommendations,
    } = req.body;

    const { data, error } = await supabase.from("documents").insert([
      {
        user_id,
        file_url,
        summary,
        insights,
        topics,
        faqs,
        recommendations,
      },
    ]);

    if (error) return res.status(500).json({ error });

    res.json({ message: "Saved successfully", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
