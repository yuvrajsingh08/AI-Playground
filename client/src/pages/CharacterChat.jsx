import { useState } from "react";
import CharacterSelector from "../components/CharacterSelector";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

const API_URL = import.meta.env.VITE_API_URL;

export default function CharacterChat() {
  const [character, setCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // persistent session
  const [sessionId] = useState(() => crypto.randomUUID());

  const sendMessage = async (text) => {
    setLoading(true);

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          character,
          message: text,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error(err);
      alert("Chat failed");
    } finally {
      setLoading(false);
    }
  };

  if (!character) {
    return (
      <div className="max-w-xl mx-auto mt-20">
        <h1 className="text-2xl font-bold mb-4">Choose a Character</h1>
        <CharacterSelector onSelect={setCharacter} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto border">
      <div className="p-4 border-b bg-white">
        <h2 className="font-bold">{character.name}</h2>
        <p className="text-sm text-gray-500">{character.anime}</p>
      </div>

      <ChatWindow messages={messages} />

      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
