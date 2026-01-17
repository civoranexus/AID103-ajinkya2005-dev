import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function DiseaseAnalysis() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("lastAnalysis"));

  const [showActions, setShowActions] = useState(true);
  const [showExplain, setShowExplain] = useState(false);

  if (!stored) {
    return null;
  }

  const { imagePreview, analysis } = stored;
  const {
    disease,
    severity,
    confidence,
    recommendation,
    risk_level,
    action_priority,
    key_risk_factors,
    decision_explanation,
  } = analysis;

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

          <img src={imagePreview} alt="Crop" style={styles.image} />

          <div style={styles.details}>
            <p><strong>Disease:</strong> {disease}</p>
            <p><strong>Severity:</strong> {severity}</p>
            <p><strong>Confidence:</strong> {confidence * 100}%</p>
            <p><strong>Risk Level:</strong> {risk_level}</p>
            <p><strong>Action Priority:</strong> {action_priority}</p>
          </div>

          <div style={styles.recommendation}>
            {recommendation}
          </div>

          {/* WHY OPTION */}
          <div style={styles.whyRow}>
            <span style={styles.whyText}>
              Why was this disease detected?
            </span>
            <button
              style={styles.whyButton}
              onClick={() => setShowExplain(true)}
            >
              Why?
            </button>
          </div>

          {/* SMART TREATMENT */}
          <div style={styles.actionSection}>
            <h3
              style={styles.actionHeading}
              onClick={() => setShowActions(!showActions)}
            >
              Smart Treatment & Action Planner
            </h3>

            {showActions && (
              <div style={styles.actionBlock}>
                <ul>
                  <li>{recommendation}</li>
                </ul>
              </div>
            )}
          </div>

          <button style={styles.button} onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </div>

      {/* EXPLAINABLE AI OVERLAY */}
      {showExplain && (
        <div style={styles.overlay}>
          <div style={styles.explainCard}>
            <h3 style={styles.explainHeading}>
              Explainable AI – Decision Reasoning
            </h3>

            <section>
              <h4>Key Risk Factors</h4>
              <ul>
                {key_risk_factors.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4>Decision Explanation</h4>
              <ul>
                {decision_explanation.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <button
              style={styles.closeButton}
              onClick={() => setShowExplain(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
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
    width: "520px",
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
  },
  recommendation: {
    backgroundColor: "#E6F6F8",
    color: "#16808D",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "16px",
  },
  whyRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  whyText: {
    color: "#142C52",
    fontWeight: "500",
  },
  whyButton: {
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "6px 14px",
    cursor: "pointer",
  },
  actionSection: {
    marginTop: "10px",
  },
  actionHeading: {
    color: "#1B9AAA",
    cursor: "pointer",
    marginBottom: "12px",
  },
  actionBlock: {
    color: "#142C52",
  },
  button: {
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  explainCard: {
    backgroundColor: "#ffffff",
    padding: "36px",
    borderRadius: "18px",
    width: "480px",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  explainHeading: {
    color: "#142C52",
    marginBottom: "16px",
  },
  closeButton: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default DiseaseAnalysis;
