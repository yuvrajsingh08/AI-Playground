import { useEffect, useRef } from "react";

export default function ChatWindow({ messages, character, thinking }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  return (
    <div className="h-full overflow-y-auto px-4 py-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-3">

        {messages.map((msg, i) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={i}
              className={`flex ${isUser ? "justify-end" : "justify-start"} items-end`}
            >
              {!isUser && (
                <img
                  src={character.image}
                  alt=""
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
              )}

              <div
                className={`px-4 py-2.5 text-sm leading-relaxed rounded-2xl
                  ${
                    isUser
                      ? "bg-indigo-600 text-white rounded-br-md"
                      : "bg-white/90 text-gray-900 rounded-bl-md shadow-sm"
                  }
                  max-w-[85%]
                `}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* THINKING INDICATOR */}
        {thinking && (
          <div className="flex justify-start items-end">
            <img
              src={character.image}
              alt=""
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <div className="bg-white/90 text-gray-700 px-4 py-2 rounded-2xl shadow-sm flex items-center gap-1">
              <span className="dot" />
              <span className="dot delay-1" />
              <span className="dot delay-2" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />

        {/* DOT ANIMATION */}
        <style>{`
          .dot {
            width: 6px;
            height: 6px;
            background: #6b7280;
            border-radius: 50%;
            animation: blink 1.4s infinite both;
          }
          .delay-1 { animation-delay: .2s; }
          .delay-2 { animation-delay: .4s; }

          @keyframes blink {
            0% { opacity: .2; }
            20% { opacity: 1; }
            100% { opacity: .2; }
          }
        `}</style>
      </div>
    </div>
  );
}
