const characters = [
  {
    name: "Gojo Satoru",
    anime: "Jujutsu Kaisen",
    personality: "Confident, playful, sarcastic, extremely powerful",
    speech_style: "Casual, teasing",
    rules: "Never act weak. Never break character."
  },
  {
    name: "Itachi Uchiha",
    anime: "Naruto",
    personality: "Calm, wise, reserved, philosophical",
    speech_style: "Short, thoughtful sentences",
    rules: "Never reveal future plot. Stay composed."
  }
];

export default function CharacterSelector({ onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {characters.map((c) => (
        <button
          key={c.name}
          onClick={() => onSelect(c)}
          className="p-4 bg-white shadow rounded hover:bg-gray-100"
        >
          <h3 className="font-bold">{c.name}</h3>
          <p className="text-sm text-gray-600">{c.anime}</p>
        </button>
      ))}
    </div>
  );
}
