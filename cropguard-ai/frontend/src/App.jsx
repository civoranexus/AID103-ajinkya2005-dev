import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import ImageUpload from "./pages/ImageUpload";
import DiseaseAnalysis from "./pages/DiseaseAnalysis";
import Dashboard from "./pages/Dashboard";
import AIAssessment from "./pages/AIAssessment";
import HistoryReports from "./pages/HistoryReports";

function App() {
  return (
    <Routes>
      {/* ENTRY */}
      <Route path="/" element={<Register />} />

      {/* CORE FLOW */}
      <Route path="/home" element={<Home />} />
      <Route path="/upload" element={<ImageUpload />} />
      <Route path="/analysis" element={<DiseaseAnalysis />} />

      {/* AI ASSESSMENT */}
      <Route path="/ai-assessment" element={<AIAssessment />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<HistoryReports />} />


      {/* FALLBACK (OPTIONAL BUT SAFE) */}
      <Route path="*" element={<Register />} />
    </Routes>
  );
}

export default App;
