import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function DiseaseAnalysis() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("lastAnalysis"));

  if (!stored) {
    return null;
  }

  const { imagePreview, analysis } = stored;

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      {/* CONTENT */}
      <div style={styles.center}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Disease Analysis</h2>

          <img src={imagePreview} style={styles.image} />

          <div style={styles.details}>
            <p><strong>Disease:</strong> {analysis.disease}</p>
            <p><strong>Severity:</strong> {analysis.severity}</p>
            <p><strong>Confidence:</strong> {analysis.confidence * 100}%</p>
          </div>

          <div style={styles.recommendation}>
            {analysis.recommendation}
          </div>

          <button style={styles.button} onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
  },
  header: {
    backgroundColor: "#142C52",
    padding: "14px 32px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logo: {
    height: "36px",
    backgroundColor: "#ffffff",
    padding: "6px",
    borderRadius: "8px",
  },
  brandText: {
    color: "#1B9AAA",
    margin: 0,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "80px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "18px",
    width: "420px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  },
  heading: {
    textAlign: "center",
    color: "#142C52",
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    borderRadius: "12px",
    marginBottom: "16px",
  },
  details: {
    color: "#142C52",
    marginBottom: "16px",
  },
  recommendation: {
    backgroundColor: "#E6F6F8",
    color: "#16808D",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default DiseaseAnalysis;
