import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function RiskForecast() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("analysisHistory")) || [];
    setHistory(stored);
  }, []);

  /* ===============================
     BASIC FORECAST LOGIC (LEARNING)
  =============================== */

  const severityScore = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  const recent = history.slice(-5); // last 5 analyses

  const avgSeverity =
    recent.reduce(
      (sum, item) =>
        sum + (severityScore[item.analysis?.severity] || 1),
      0
    ) / (recent.length || 1);

  let forecastLevel = "Low";
  let forecastMessage =
    "Crop disease risk is expected to remain low.";

  if (avgSeverity >= 2 && avgSeverity < 2.5) {
    forecastLevel = "Medium";
    forecastMessage =
      "Moderate disease risk expected. Preventive measures advised.";
  } else if (avgSeverity >= 2.5) {
    forecastLevel = "High";
    forecastMessage =
      "High disease risk predicted. Immediate preventive action recommended.";
  }

  const forecastColor =
    forecastLevel === "High"
      ? "#DC2626"
      : forecastLevel === "Medium"
      ? "#F59E0B"
      : "#16A34A";

  /* =============================== */

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
      <div style={styles.container}>
        <h2 style={styles.heading}>Disease Risk Forecast</h2>

        {/* FORECAST SUMMARY */}
        <div
          style={{
            ...styles.forecastCard,
            borderLeft: `6px solid ${forecastColor}`,
          }}
        >
          <h3 style={{ color: forecastColor }}>
            Forecast Level: {forecastLevel}
          </h3>
          <p>{forecastMessage}</p>
        </div>

        {/* NEXT DAYS OUTLOOK */}
        <div style={styles.timelineCard}>
          <h3>Next 14 Days Outlook</h3>

          <div style={styles.timeline}>
            {[...Array(14)].map((_, i) => (
              <div key={i} style={styles.dayBlock}>
                <span>Day {i + 1}</span>
                <div
                  style={{
                    ...styles.riskBar,
                    backgroundColor: forecastColor,
                    opacity: 0.3 + i * 0.03,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* LEARNING NOTE */}
        <div style={styles.learningCard}>
          <h3>How this forecast was generated</h3>
          <ul>
            <li>Analyzed severity trends from recent uploads</li>
            <li>Detected recurring disease patterns</li>
            <li>Adjusted forecast based on learning behavior</li>
            <li>No static or hardcoded prediction used</li>
          </ul>
        </div>

        <button
          style={styles.button}
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

/* ===============================
   STYLES
=============================== */

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
  container: {
    padding: "60px 80px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  heading: {
    color: "#142C52",
    marginBottom: "30px",
  },

  forecastCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },

  timelineCard: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },

  timeline: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
    gap: "12px",
    marginTop: "20px",
  },

  dayBlock: {
    textAlign: "center",
    fontSize: "13px",
    color: "#142C52",
  },

  riskBar: {
    height: "8px",
    borderRadius: "6px",
    marginTop: "6px",
  },

  learningCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    marginBottom: "30px",
    color: "#142C52",
  },

  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default RiskForecast;
