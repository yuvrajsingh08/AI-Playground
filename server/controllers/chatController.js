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

Core Personality:
${character.personality}

Speaking Style:
${character.speech_style}

Behavior Rules:
${character.rules}

Language Rules (VERY IMPORTANT):
- Primary language MUST always be English
- Do NOT use Hinglish by default
- ONLY use Hinglish if the user first uses Hinglish
- When using Hinglish:
  - Mix Hindi words (written in English letters) into English sentences
  - Do NOT write full Hindi sentences
  - Do NOT use Devanagari script
- If the user speaks pure English, reply in pure English
- Mirror the user's language style naturally, do not force it

Allowed Hinglish examples (ONLY when user uses Hinglish):
- "Kaise ho, everything okay?"
- "Relax karo, you’ve got this."
- "Thoda focus rakho, samjhe?"

NOT allowed:
- Full Hindi replies
- Hindi-only sentences
- Devanagari text
- Random Hinglish without user initiating it

Conversation Rules (VERY IMPORTANT):
- This is an ongoing conversation, NOT a one-time explanation
- Keep responses short and natural (2–6 sentences)
- Do NOT give full guides or long lectures
- Always respond based on the user's last message
- Ask at least ONE follow-up question every reply
- If the character is aggressive or blunt, reflect that naturally
- Never break character
- Never mention being an AI, model, or assistant

Tone:
Immersive anime role-play.
Speak exactly how the character would, mirroring the user's language and tone naturally.
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

