import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

function extractJSON(text) {
  // Remove markdown code fences if present
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

export const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;

    const prompt = `
You are a JSON API.

Return ONLY valid JSON.
Do NOT use markdown.
Do NOT wrap in backticks.

Format:
{
  "summary": "",
  "insights": [],
  "topics": [],
  "faqs": [],
  "recommendations": []
}

Document:
${text}
`;

    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1
    });

    const raw = completion.choices[0].message.content;

    const parsed = extractJSON(raw);

    res.json(parsed);

  } catch (err) {
    console.error("AI RAW ERROR:", err);
    res.status(500).json({
      error: "AI analysis failed",
      details: err.message,
    });
  }
};
