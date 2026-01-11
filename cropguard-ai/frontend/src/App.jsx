import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ImageUpload from "./pages/ImageUpload";
import DiseaseAnalysis from "./pages/DiseaseAnalysis";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/upload" element={<ImageUpload />} />
      <Route path="/disease-analysis" element={<DiseaseAnalysis />} />
    </Routes>
  );
}

export default App;
