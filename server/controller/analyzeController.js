const Groq =  require("groq-sdk");
const dotenv = require("dotenv");
dotenv.config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.analyzeText = async (req, res) => {
  try {
    const { text } = req.body;

    const prompt = `
    Extract structured knowledge from this document.
    Return ONLY valid JSON.

    {
      "summary": "",
      "insights": [],
      "topics": [],
      "faqs": [],
      "recommendations": []
    }

    Document Text:
    ${text}
    `;

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }]
    });


    const json = JSON.parse(response.choices[0].message.content);

    res.json(json);

  } catch (err) {
    res.status(500).json({ error: "AI analysis failed", details: err.message });
  }
};
