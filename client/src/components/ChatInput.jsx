import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-white border-t">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Message..."
        className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-1 focus:ring-indigo-500"
        disabled={disabled}
      />
      <button
        onClick={send}
        disabled={disabled}
        className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-full"
      >
        Send
      </button>
    </div>
  );
}
