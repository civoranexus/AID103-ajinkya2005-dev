import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ImageSurvey from "./pages/ImageSurvey";

function ProtectedRoute({ children }) {
  const profile = localStorage.getItem("farmerProfile");
  return profile ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/survey/image-detection"
        element={
          <ProtectedRoute>
            <ImageSurvey />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
