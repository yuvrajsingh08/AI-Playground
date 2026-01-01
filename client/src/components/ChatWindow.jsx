export default function ChatWindow({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-[75%] p-3 rounded ${
            msg.role === "user"
              ? "bg-blue-600 text-white ml-auto"
              : "bg-gray-200 text-black"
          }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}
