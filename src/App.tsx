import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import MobileHome from "./pages/MobileHome";
import Zodiac from "./pages/Zodiac";
import Tarot from "./pages/Tarot";
import Bazi from "./pages/Bazi";
import PalmReading from "./pages/PalmReading";
import Numerology from "./pages/Numerology";

function AppShell() {
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile =
        /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) ||
        ('ontouchstart' in window && window.innerWidth < 768);
      setIsMobile(mobile);
    };
    check();
    setReady(true);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!ready) return null;

  return (
    <Routes>
      <Route path="/" element={isMobile ? <MobileHome /> : <Home />} />
      <Route path="/zodiac" element={<Zodiac />} />
      <Route path="/tarot" element={<Tarot />} />
      <Route path="/bazi" element={<Bazi />} />
      <Route path="/palm" element={<PalmReading />} />
      <Route path="/numerology" element={<Numerology />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}