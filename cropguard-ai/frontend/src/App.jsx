import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import ImageUpload from "./pages/ImageUpload";
import DiseaseAnalysis from "./pages/DiseaseAnalysis";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import PestDetection from "./pages/PestDetection";
import LocalAgroStores from "./pages/LocalAgroStores";
import CropCalendar from "./pages/CropCalendar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/upload" element={<ImageUpload />} />
      <Route path="/analysis" element={<DiseaseAnalysis />} />
      <Route path="/history" element={<History />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pests" element={<PestDetection />} />
      <Route path="/stores" element={<LocalAgroStores />} />
      <Route path="/calendar" element={<CropCalendar />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
