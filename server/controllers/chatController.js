const Groq = require("groq-sdk");
const dotenv = require("dotenv");
dotenv.config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * In-memory conversation store (simple & enough for now)
 * key = sessionId, value = message array
 */
const conversations = new Map();

function buildSystemPrompt(character) {
  return `
You are ${character.name} from the anime "${character.anime}".

Personality:
${character.personality}

Speaking style:
${character.speech_style}

Conversation rules:
- You are having an ongoing conversation, not giving a lecture
- Keep responses concise (3–6 sentences max)
- Ask at least ONE follow-up question every reply
- Do NOT explain everything at once
- Guide the user step by step
- React to the user's previous message naturally
- Never break character
- Never mention you are an AI

Tone:
Natural, conversational, immersive role-play.
`;
}


exports.chatWithCharacter = async (req, res) => {
  try {
    const { sessionId, character, message } = req.body;

    if (!sessionId || !character || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Initialize memory if new session
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, []);
    }

    const history = conversations.get(sessionId);

    const messages = [
      { role: "system", content: buildSystemPrompt(character) },
      ...history,
      { role: "user", content: message },
    ];

    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    // Save conversation memory
    history.push({ role: "user", content: message });
    history.push({ role: "assistant", content: reply });

    // Limit memory size (important)
    if (history.length > 20) {
      history.splice(0, history.length - 20);
    }

    res.json({
      reply,
    });

  } catch (err) {
    console.error("CHAT ERROR:", err.message);
    res.status(500).json({
      error: "Chat failed",
      details: err.message,
    });
  }
};

