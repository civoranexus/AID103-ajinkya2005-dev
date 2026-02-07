import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

/* ===============================
   🔐 SAFE PARSE HELPERS (ADDITION)
=============================== */
const safeParse = (key, fallback) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? fallback;
  } catch {
    return fallback;
  }
};

function DiseaseAnalysis() {
  const navigate = useNavigate();

  const stored = safeParse("lastAnalysis", null);
  const history = safeParse("analysisHistory", []);
  const farmerProfile = safeParse("farmerProfile", null);

  const [showActions, setShowActions] = useState(true);
  const [showExplain, setShowExplain] = useState(false);
  const [heatmap, setHeatmap] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [opacity, setOpacity] = useState(0.4);

  /* ===============================
     🔐 HARD GUARD (ADDITION)
  =============================== */
  if (!stored || !stored.analysis) {
    return (
      <div style={{ padding: "80px", textAlign: "center", color: "#142C52" }}>
        <h2>No Analysis Available</h2>
        <p>Please upload a crop image to view AI analysis.</p>
        <button
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#1B9AAA",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const { imagePreview, analysis } = stored;

  const {
    disease,
    severity,
    confidence,
    recommendation,
    risk_level,
    action_priority,
    key_risk_factors = [],
    decision_explanation = [],
  } = analysis;

  useEffect(() => {
    if (analysis?.heatmap) {
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

  const sameDiseaseCount = Array.isArray(history)
    ? history.filter((item) => item.analysis?.disease === disease).length
    : 0;

  let learningLevel = "Info";
  let learningMessage =
    "This is the first recorded occurrence of this disease.";

  if (sameDiseaseCount >= 2 && sameDiseaseCount <= 3) {
    learningLevel = "Warning";
    learningMessage =
      "Repeated disease patterns detected. AI is learning recurrence trends.";
  } else if (sameDiseaseCount >= 4) {
    learningLevel = "Critical";
    learningMessage =
      "Critical recurrence detected. Historical patterns escalated risk.";
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
                  min="0.1"
                  max="0.7"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                />
              </div>

              <div style={styles.imageCompare}>
                <img src={imagePreview} style={styles.baseImage} />
                {showHeatmap && (
                  <img
                    src={`data:image/png;base64,${heatmap}`}
                    style={{ ...styles.overlayImage, opacity }}
                  />
                )}
              </div>
            </div>
          )}

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

          {farmerProfile && (
            <div style={styles.contextBox}>
              <h4>Farm Context Used by AI</h4>
              <p><strong>Location:</strong> {farmerProfile.location}</p>
              <p><strong>Crop:</strong> {farmerProfile.cropType}</p>
              <p><strong>Growth Stage:</strong> {farmerProfile.growthStage}</p>
              <p><strong>Crop Age:</strong> {farmerProfile.cropAgeDays} days</p>
              <p><strong>Cultivation:</strong> {farmerProfile.cultivationType}</p>
            </div>
          )}

          <div style={styles.details}>
            <p><strong>Disease:</strong> {disease}</p>
            <p><strong>Action Priority:</strong> {action_priority}</p>
          </div>

          <div style={styles.recommendation}>{recommendation}</div>

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
            <span>Why was this disease detected?</span>
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
            <h3>Explainable AI – Decision Reasoning</h3>

            <h4>Key Risk Factors</h4>
            <ul>
              {Array.isArray(key_risk_factors) && key_risk_factors.length > 0
                ? key_risk_factors.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))
                : <li>Environmental and visual stress indicators detected</li>}
            </ul>

            <h4>Decision Explanation</h4>
            <ul>
              {Array.isArray(decision_explanation) && decision_explanation.length > 0
                ? decision_explanation.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))
                : <li>Model confidence and learned disease patterns exceeded threshold</li>}
            </ul>

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
  card: { backgroundColor: "#fff", padding: "40px", borderRadius: "18px", width: "520px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)" },
  heading: { textAlign: "center", marginBottom: "20px" },
  heatmapBox: { backgroundColor: "#F9FAFB", padding: "16px", borderRadius: "14px", marginBottom: "20px" },
  heatmapTitle: { marginBottom: "10px" },
  toggleRow: { display: "flex", justifyContent: "space-between", marginBottom: "10px" },
  toggleBtn: { backgroundColor: "#1B9AAA", color: "#fff", border: "none", borderRadius: "8px", padding: "6px 12px" },
  imageCompare: { position: "relative" },
  baseImage: { width: "100%" },
  overlayImage: { position: "absolute", top: 0, left: 0, width: "100%" },
  badgeRow: { display: "flex", justifyContent: "space-between", marginBottom: "14px" },
  riskBadge: { color: "#fff", padding: "6px 12px", borderRadius: "20px" },
  severityText: { fontWeight: "600" },
  confidenceWrapper: { marginBottom: "16px" },
  confidenceLabel: { fontSize: "13px" },
  confidenceTrack: { height: "8px", backgroundColor: "#e5e7eb", borderRadius: "6px" },
  confidenceFill: { height: "100%" },
  contextBox: { backgroundColor: "#F1F5F9", padding: "14px", borderRadius: "12px", marginBottom: "16px" },
  recommendation: { backgroundColor: "#E6F6F8", padding: "14px", borderRadius: "12px", marginBottom: "16px" },
  learningBox: { backgroundColor: "#F9FAFB", padding: "14px", borderRadius: "10px", marginBottom: "16px" },
  whyRow: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
  whyButton: { backgroundColor: "#1B9AAA", color: "#fff", border: "none", borderRadius: "8px", padding: "6px 14px" },
  button: { width: "100%", padding: "14px", backgroundColor: "#1B9AAA", color: "#fff", border: "none", borderRadius: "12px" },
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center" },
  explainCard: { backgroundColor: "#fff", padding: "36px", borderRadius: "18px", width: "480px" },
  closeButton: { marginTop: "20px", width: "100%", padding: "12px", backgroundColor: "#1B9AAA", color: "#fff", border: "none", borderRadius: "10px" },
};

export default DiseaseAnalysis;
