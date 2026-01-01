import { useState } from "react";
import characters from "../data/characters";

export default function CharacterSelector({ onSelect }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const prev = () => {
    setDirection("prev");
    setIndex((i) => (i === 0 ? characters.length - 1 : i - 1));
  };

  const next = () => {
    setDirection("next");
    setIndex((i) => (i === characters.length - 1 ? 0 : i + 1));
  };

  const current = characters[index];
  const left = characters[(index - 1 + characters.length) % characters.length];
  const right = characters[(index + 1) % characters.length];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 flex flex-col items-center justify-center px-4 overflow-hidden">

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-10 tracking-wide text-center">
        Choose Your Character
      </h1>

      {/* Character Stage */}
      <div className="relative flex items-center justify-center w-full max-w-6xl h-[420px] sm:h-[520px]">

        {/* LEFT PREVIEW */}
        <div className="absolute left-0 hidden sm:flex w-56 h-72 items-center justify-center opacity-40 grayscale blur-[1px] scale-95 transition-all duration-500">
          <img
            src={left.image}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* MAIN CHARACTER */}
        <div
          key={index}
          className={`z-10 flex flex-col items-center transition-all duration-500 ease-out
            ${direction === "next" ? "animate-slide-in-right" : "animate-slide-in-left"}
          `}
        >
          <div className="w-[260px] h-[320px] sm:w-[360px] sm:h-[420px] flex items-center justify-center overflow-hidden">
            <img
              src={current.image}
              alt={current.name}
              className="max-w-full max-h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)]"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 sm:mt-6">
            {current.name}
          </h2>

          <p className="text-gray-600 text-sm sm:text-lg">
            {current.anime}
          </p>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="absolute right-0 hidden sm:flex w-56 h-72 items-center justify-center opacity-40 grayscale blur-[1px] scale-95 transition-all duration-500">
          <img
            src={right.image}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">

        <button
          onClick={prev}
          className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12
                     text-gray-800 bg-white/70 rounded-full hover:bg-white transition shadow"
        >
          ◀
        </button>

        <button
          onClick={() => onSelect(current)}
          className="px-8 sm:px-10 py-2.5 sm:py-3
                     bg-gray-900 hover:bg-gray-800
                     text-white text-base sm:text-lg font-semibold
                     rounded-xl transition shadow-lg"
        >
          Select
        </button>

        <button
          onClick={next}
          className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12
                     text-gray-800 bg-white/70 rounded-full hover:bg-white transition shadow"
        >
          ▶
        </button>

      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-slide-in-right { animation: slideInRight 0.45s ease-out; }
        .animate-slide-in-left { animation: slideInLeft 0.45s ease-out; }
      `}</style>
    </div>
  );
}
