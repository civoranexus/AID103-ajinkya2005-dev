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
  const { disease, severity, confidence, recommendation } = analysis;

  // -------- SMART TREATMENT LOGIC --------
  const treatmentPlan = {
    immediate:
      severity === "High"
        ? [
            "Apply recommended fungicide immediately",
            "Isolate affected crop sections",
            "Avoid overhead irrigation",
          ]
        : severity === "Medium"
        ? [
            "Apply preventive spray",
            "Monitor crop condition daily",
          ]
        : [
            "No chemical treatment required",
            "Continue regular monitoring",
          ],

    shortTerm: [
      "Inspect crops every 3–4 days",
      "Maintain proper field sanitation",
      "Track disease progression",
    ],

    preventive: [
      "Ensure proper crop spacing",
      "Avoid excess moisture retention",
      "Use disease-resistant seed varieties next cycle",
    ],
  };

  // -------- EXPLAINABLE AI (MOCK) --------
  const explainableAI = {
    visual: [
      "Irregular leaf spot patterns detected",
      "Discoloration near leaf edges",
      "Texture inconsistency across affected areas",
    ],
    environmental: [
      "High humidity during early crop stage",
      "Excess soil moisture retention",
      "Limited air circulation between plants",
    ],
    cropStage: [
      "Crop in early vegetative stage",
      "High susceptibility to fungal infection",
    ],
    confidenceReason: [
      "Clear visual patterns matched training data",
      "Environmental conditions strongly favor disease",
      "High similarity with known disease cases",
    ],
  };

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
            <p><strong>Disease:</strong> {disease}</p>
            <p><strong>Severity:</strong> {severity}</p>
            <p><strong>Confidence:</strong> {confidence * 100}%</p>
          </div>

          <div style={styles.recommendation}>
            {recommendation}
          </div>

          {/* WHY OPTION */}
          <div style={styles.whyRow}>
            <span style={styles.whyText}>Why was this disease detected?</span>
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
              <>
                <div style={styles.actionBlock}>
                  <h4>Immediate Actions</h4>
                  <ul>
                    {treatmentPlan.immediate.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div style={styles.actionBlock}>
                  <h4>Short-Term Actions</h4>
                  <ul>
                    {treatmentPlan.shortTerm.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div style={styles.actionBlock}>
                  <h4>Preventive Measures</h4>
                  <ul>
                    {treatmentPlan.preventive.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
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
            <h3 style={styles.explainHeading}>Explainable AI – Why?</h3>

            <section>
              <h4>Visual Indicators</h4>
              <ul>
                {explainableAI.visual.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4>Environmental Factors</h4>
              <ul>
                {explainableAI.environmental.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4>Crop Stage Sensitivity</h4>
              <ul>
                {explainableAI.cropStage.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4>Confidence Explanation</h4>
              <ul>
                {explainableAI.confidenceReason.map((c, i) => (
                  <li key={i}>{c}</li>
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
    marginBottom: "12px",
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
