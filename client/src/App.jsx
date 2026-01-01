import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CharacterChat from "./pages/CharacterChat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-knowledge-extractor" element={<Dashboard />} />
        <Route path="/chat" element={<CharacterChat />} />
      </Routes>
    </BrowserRouter>
  );
}
