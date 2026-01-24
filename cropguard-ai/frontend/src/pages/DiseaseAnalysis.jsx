import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function DiseaseAnalysis() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("lastAnalysis"));

  const [showActions, setShowActions] = useState(true);
  const [showExplain, setShowExplain] = useState(false);

  if (!stored) return null;

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

  
  const riskColor =
    risk_level === "High"
      ? "#DC2626"
      : risk_level === "Medium"
      ? "#F59E0B"
      : "#16A34A";

  const severityColor =
    severity === "High"
      ? "#DC2626"
      : severity === "Medium"
      ? "#F59E0B"
      : "#16A34A";

  
  let forecastRisk = "Low";
  let forecastColor = "#16A34A";
  let forecastMessage =
    "Disease risk is expected to remain low over the next 14 days.";

  if (severity === "High" && confidence >= 0.75) {
    forecastRisk = "High";
    forecastColor = "#DC2626";
    forecastMessage =
      "High probability of disease progression in the next 7–14 days without immediate intervention.";
  } else if (severity === "Medium") {
    forecastRisk = "Moderate";
    forecastColor = "#F59E0B";
    forecastMessage =
      "Moderate risk detected. Close monitoring and preventive actions are advised.";
  }

  return (
    <div style={styles.page}>
      
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

    
      <div style={styles.center}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Disease Analysis</h2>

          <img src={imagePreview} alt="Crop" style={styles.image} />

          
          <div style={styles.badgeRow}>
            <span style={{ ...styles.riskBadge, backgroundColor: riskColor }}>
              Risk Level: {risk_level}
            </span>

            <span style={{ ...styles.severityText, color: severityColor }}>
              Severity: {severity}
            </span>
          </div>

          <div style={styles.confidenceWrapper}>
            <div style={styles.confidenceLabel}>
              AI Confidence: {Math.round(confidence * 100)}%
            </div>
            <div style={styles.confidenceTrack}>
              <div
                style={{
                  ...styles.confidenceFill,
                  width: `${confidence * 100}%`,
                  backgroundColor: severityColor,
                }}
              />
            </div>
          </div>

          
          <div style={styles.details}>
            <p><strong>Disease:</strong> {disease}</p>
            <p><strong>Action Priority:</strong> {action_priority}</p>
          </div>

          <div style={styles.recommendation}>
            {recommendation}
          </div>

          
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "14px",
              marginBottom: "20px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
              borderLeft: `6px solid ${forecastColor}`,
            }}
          >
            <h4 style={{ color: "#142C52", marginBottom: "6px" }}>
              Risk Forecast (Next 14 Days)
            </h4>

            <p style={{ fontWeight: "600", color: forecastColor }}>
              Forecasted Risk Level: {forecastRisk}
            </p>

            <p style={{ color: "#142C52", marginTop: "6px" }}>
              {forecastMessage}
            </p>
          </div>

          
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
  page: { minHeight: "100vh", backgroundColor: "#f4f6f8" },
  header: { backgroundColor: "#142C52", padding: "14px 32px" },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  logo: {
    height: "36px",
    backgroundColor: "#ffffff",
    padding: "6px",
    borderRadius: "8px",
  },
  brandText: { color: "#1B9AAA", margin: 0 },

  center: { display: "flex", justifyContent: "center", paddingTop: "80px" },
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
    marginBottom: "18px",
  },

  badgeRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "14px",
  },
  riskBadge: {
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  severityText: { fontWeight: "600" },

  confidenceWrapper: { marginBottom: "16px" },
  confidenceLabel: { fontSize: "13px", marginBottom: "6px" },
  confidenceTrack: {
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "6px",
    overflow: "hidden",
  },
  confidenceFill: { height: "100%" },

  details: { color: "#142C52", marginBottom: "12px" },
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
    marginBottom: "20px",
  },
  whyText: { fontWeight: "500", color: "#142C52" },
  whyButton: {
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "6px 14px",
    cursor: "pointer",
  },

  actionHeading: { color: "#1B9AAA", cursor: "pointer" },
  actionBlock: { color: "#142C52" },

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
  },
  explainHeading: { color: "#142C52" },
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
