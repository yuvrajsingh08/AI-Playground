import { useState } from "react";
import CharacterSelector from "../components/CharacterSelector";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

const API_URL = import.meta.env.VITE_API_URL;

export default function CharacterChat() {
  const [character, setCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [thinking, setThinking] = useState(false);

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    setThinking(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, character, message: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } finally {
      setLoading(false);
      setThinking(false);
    }
  };

  if (!character) return <CharacterSelector onSelect={setCharacter} />;

  return (
    <div className="h-screen w-screen flex bg-gray-100">
      {/* LEFT: CHARACTER PANEL */}
      <div className="hidden md:flex w-[40%] bg-gradient-to-br from-slate-900 to-gray-800 text-white flex-col items-center justify-center p-8">
        <img
          src={character.image}
          alt={character.name}
          className="max-h-[420px] object-contain drop-shadow-2xl"
        />

        <h2 className="mt-6 text-3xl font-bold">{character.name}</h2>
        <p className="text-gray-300 mt-1">{character.anime}</p>

        <div className="mt-6 bg-white/10 rounded-xl p-4 text-sm text-gray-200 leading-relaxed">
          <p>
            <strong>Personality:</strong> {character.personality}
          </p>
          <p className="mt-2">
            <strong>Style:</strong> {character.speech_style}
          </p>
        </div>
      </div>

      {/* RIGHT: CHAT PANEL */}
      <div className="flex flex-col w-full md:w-[60%] bg-linear-to-b from-slate-50 to-gray-100">
        {/* CHAT HEADER */}
        <div className="flex items-center gap-3 px-5 py-4 bg-white/80 backdrop-blur border-b">
          <img
            src={character.image}
            alt={character.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="font-semibold text-sm text-gray-900">
              {character.name}
            </p>
            <p className="text-xs text-gray-500">{character.anime}</p>
          </div>
        </div>

        {/* CHAT BODY */}
        <div className="flex-1 min-h-0">
          <ChatWindow
            messages={messages}
            character={character}
            thinking={thinking}
          />
        </div>

        {/* INPUT */}
        <ChatInput onSend={sendMessage} disabled={loading} />
      </div>
    </div>
  );
}
