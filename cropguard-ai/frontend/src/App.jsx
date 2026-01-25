import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import ImageUpload from "./pages/ImageUpload";
import DiseaseAnalysis from "./pages/DiseaseAnalysis";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import RiskForecast from "./pages/RiskForecast"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/analysis" element={<DiseaseAnalysis />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/risk-forecast" element={<RiskForecast />} />
      </Routes>
    </Router>
  );
}

export default App;
