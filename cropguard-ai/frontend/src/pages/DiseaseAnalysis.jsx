import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function DiseaseAnalysis() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("lastAnalysis"));
  const history =
    JSON.parse(localStorage.getItem("analysisHistory")) || [];

  const [showActions, setShowActions] = useState(true);
  const [showExplain, setShowExplain] = useState(false);

  const [heatmap, setHeatmap] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [opacity, setOpacity] = useState(0.6);

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

  useEffect(() => {
    if (analysis.heatmap) {
      setHeatmap(analysis.heatmap);
    }
  }, [analysis]);

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

  const sameDiseaseCount = history.filter(
    (item) => item.analysis?.disease === disease
  ).length;

  let learningLevel = "Info";
  let learningMessage =
    "This is the first recorded occurrence of this disease.";

  if (sameDiseaseCount >= 2 && sameDiseaseCount <= 3) {
    learningLevel = "Warning";
    learningMessage =
      "Repeated occurrences detected. AI is learning a recurring disease pattern.";
  } else if (sameDiseaseCount >= 4) {
    learningLevel = "Critical";
    learningMessage =
      "Critical recurring pattern detected. AI escalated risk from historical data.";
  }

  const learningColor =
    learningLevel === "Critical"
      ? "#DC2626"
      : learningLevel === "Warning"
      ? "#F59E0B"
      : "#16A34A";

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

          {heatmap && (
            <div style={styles.heatmapBox}>
              <h4 style={styles.heatmapTitle}>AI Vision Overlay</h4>

              <div style={styles.toggleRow}>
                <button
                  style={styles.toggleBtn}
                  onClick={() => setShowHeatmap(!showHeatmap)}
                >
                  {showHeatmap ? "Hide AI Overlay" : "Show AI Overlay"}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(e.target.value)}
                />
              </div>

              <div style={styles.imageCompare}>
                <img src={imagePreview} style={styles.baseImage} />

                {showHeatmap && (
                  <img
                    src={`data:image/png;base64,${heatmap}`}
                    style={{
                      ...styles.overlayImage,
                      opacity: opacity,
                    }}
                  />
                )}
              </div>
            </div>
          )}

          <div style={styles.badgeRow}>
            <span
              style={{
                ...styles.riskBadge,
                backgroundColor: riskColor,
              }}
            >
              Risk Level: {risk_level}
            </span>

            <span
              style={{
                ...styles.severityText,
                color: severityColor,
              }}
            >
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
              ...styles.learningBox,
              borderLeft: `6px solid ${learningColor}`,
            }}
          >
            <strong>AI Learning Insight</strong>
            <p style={{ marginTop: "6px" }}>{learningMessage}</p>
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
  logo: { height: "36px", backgroundColor: "#fff", padding: "6px", borderRadius: "8px" },
  brandText: { color: "#1B9AAA", margin: 0 },

  center: { display: "flex", justifyContent: "center", paddingTop: "80px" },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "18px",
    width: "520px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  },

  heading: { textAlign: "center", color: "#142C52", marginBottom: "20px" },

  heatmapBox: {
    marginBottom: "22px",
    backgroundColor: "#F9FAFB",
    padding: "16px",
    borderRadius: "14px",
    textAlign: "center",
  },

  heatmapTitle: { marginBottom: "10px", color: "#142C52", fontWeight: "600" },

  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    gap: "12px",
  },

  toggleBtn: {
    backgroundColor: "#1B9AAA",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  imageCompare: { position: "relative", width: "100%", borderRadius: "12px", overflow: "hidden" },
  baseImage: { width: "100%", display: "block" },
  overlayImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    pointerEvents: "none",
    transition: "opacity 0.3s ease",
  },

  badgeRow: { display: "flex", justifyContent: "space-between", marginBottom: "14px" },
  riskBadge: { color: "#fff", padding: "6px 12px", borderRadius: "20px", fontWeight: "600" },
  severityText: { fontWeight: "600" },

  confidenceWrapper: { marginBottom: "16px" },
  confidenceLabel: { fontSize: "13px", marginBottom: "6px" },
  confidenceTrack: { height: "8px", backgroundColor: "#e5e7eb", borderRadius: "6px" },
  confidenceFill: { height: "100%" },

  details: { marginBottom: "12px" },
  recommendation: {
    backgroundColor: "#E6F6F8",
    color: "#16808D",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "16px",
  },

  learningBox: {
    backgroundColor: "#F9FAFB",
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "18px",
  },

  whyRow: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
  whyButton: {
    backgroundColor: "#1B9AAA",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "6px 14px",
    cursor: "pointer",
  },

  button: {
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    backgroundColor: "#1B9AAA",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
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
    backgroundColor: "#fff",
    padding: "36px",
    borderRadius: "18px",
    width: "480px",
    maxHeight: "80vh",
    overflowY: "auto",
  },

  closeButton: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    backgroundColor: "#1B9AAA",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
  },
};

export default DiseaseAnalysis;
