import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/logo.png";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("lastAnalysis"));
    const storedHistory =
      JSON.parse(localStorage.getItem("analysisHistory")) || [];

    if (stored) setAnalysis(stored);
    setHistory(storedHistory);
  }, []);

  const chartData = [
    { name: "Low", value: 4 },
    { name: "Medium", value: 6 },
    { name: "High", value: 2 },
  ];

  const getColor = (level) =>
    level === "High"
      ? "#DC2626"
      : level === "Medium"
      ? "#F59E0B"
      : "#16A34A";

  /* ===============================
     LEARNING SUMMARY LOGIC
  =============================== */
  const diseaseFrequency = {};
  history.forEach((item) => {
    const d = item.analysis?.disease;
    if (d) diseaseFrequency[d] = (diseaseFrequency[d] || 0) + 1;
  });

  const mostFrequentDisease = Object.keys(diseaseFrequency).reduce(
    (a, b) =>
      diseaseFrequency[a] > diseaseFrequency[b] ? a : b,
    ""
  );

  const recurrenceCount = diseaseFrequency[mostFrequentDisease] || 0;

  let learningLevel = "Normal";
  if (recurrenceCount >= 2 && recurrenceCount <= 3)
    learningLevel = "Warning";
  else if (recurrenceCount >= 4)
    learningLevel = "Critical";

  const learningColor =
    learningLevel === "Critical"
      ? "#DC2626"
      : learningLevel === "Warning"
      ? "#F59E0B"
      : "#16A34A";

  /* ===============================
     SEVERITY TREND LEARNING (NEW)
  =============================== */
  const severityMap = { Low: 1, Medium: 2, High: 3 };

  let severityTrend = "Stable";
  let severityTrendColor = "#16A34A";
  let severityTrendMessage =
    "Disease severity has remained stable over time.";

  if (history.length >= 2) {
    const first =
      severityMap[history[0].analysis?.severity] || 1;
    const last =
      severityMap[
        history[history.length - 1].analysis?.severity
      ] || 1;

    if (last > first) {
      severityTrend = "Worsening";
      severityTrendColor = "#DC2626";
      severityTrendMessage =
        "Disease severity has increased over successive analyses.";
    } else if (last < first) {
      severityTrend = "Improving";
      severityTrendColor = "#16A34A";
      severityTrendMessage =
        "Disease severity is improving based on recent results.";
    }
  }

  /* =============================== */

  const downloadPDF = async () => {
    const element = document.getElementById("dashboard-export");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 10, width, height);
    pdf.save("CropGuard_Dashboard_Report.pdf");
  };

  const severityColor = analysis
    ? getColor(analysis.analysis.risk_level)
    : "#16A34A";

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>Dashboard Overview</h2>

        {/* OVERVIEW CARDS */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <h4>Total Analyses</h4>
            <p>{history.length}</p>
          </div>
          <div style={styles.card}>
            <h4>Recurring Disease</h4>
            <p>{mostFrequentDisease || "None"}</p>
          </div>
          <div style={styles.card}>
            <h4>Learning Status</h4>
            <p style={{ color: learningColor }}>{learningLevel}</p>
          </div>
        </div>

        {/* CHART */}
        <div style={styles.chartCard}>
          <h4>Disease Severity Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1B9AAA" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI LEARNING SUMMARY */}
        {mostFrequentDisease && (
          <div
            style={{
              ...styles.learningCard,
              borderLeft: `6px solid ${learningColor}`,
            }}
          >
            <h3>AI Learning Summary</h3>
            <p>
              <strong>{mostFrequentDisease}</strong> detected{" "}
              <strong>{recurrenceCount}</strong> times.
            </p>
            <p>
              Learning level:{" "}
              <strong style={{ color: learningColor }}>
                {learningLevel}
              </strong>
            </p>

            {/* SEVERITY TREND */}
            <p
              style={{
                marginTop: "10px",
                fontWeight: "600",
                color: severityTrendColor,
              }}
            >
              Severity Trend: {severityTrend}
            </p>
            <p>{severityTrendMessage}</p>
          </div>
        )}

        {/* EXPORT + VISUAL INDICATORS */}
        {analysis && (
          <div style={styles.exportSection}>
            <div style={styles.exportCard} id="dashboard-export">
              <h3>Latest Analysis Summary</h3>

              <div style={styles.indicatorRow}>
                <span
                  style={{
                    ...styles.riskBadge,
                    backgroundColor: severityColor,
                  }}
                >
                  Risk: {analysis.analysis.risk_level}
                </span>

                <span
                  style={{
                    ...styles.severityText,
                    color: severityColor,
                  }}
                >
                  Severity: {analysis.analysis.severity}
                </span>
              </div>

              <img
                src={analysis.imagePreview}
                alt="Crop"
                style={styles.image}
              />

              <p>
                <strong>Disease:</strong>{" "}
                {analysis.analysis.disease}
              </p>

              <div style={styles.confidenceBlock}>
                <span>
                  <strong>Confidence:</strong>{" "}
                  {Math.round(
                    analysis.analysis.confidence * 100
                  )}
                  %
                </span>

                <div style={styles.track}>
                  <div
                    style={{
                      ...styles.fill,
                      width: `${
                        analysis.analysis.confidence * 100
                      }%`,
                      backgroundColor: severityColor,
                    }}
                  />
                </div>
              </div>

              <div style={styles.recommendation}>
                {analysis.analysis.recommendation}
              </div>
            </div>

            <button
              style={styles.downloadBtn}
              onClick={downloadPDF}
            >
              Download Latest Report (PDF)
            </button>
          </div>
        )}
      </div>
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
  container: { padding: "60px 80px" },
  heading: { color: "#142C52", marginBottom: "30px" },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    color: "#142C52",
  },

  chartCard: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    marginBottom: "40px",
  },

  learningCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    marginBottom: "40px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    color: "#142C52",
  },

  exportSection: { marginTop: "40px" },
  exportCard: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    maxWidth: "600px",
  },

  indicatorRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  riskBadge: {
    color: "#ffffff",
    padding: "4px 12px",
    borderRadius: "16px",
    fontSize: "12px",
    fontWeight: "600",
  },
  severityText: { fontWeight: "600" },

  confidenceBlock: { marginTop: "10px" },
  track: {
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "6px",
    overflow: "hidden",
    marginTop: "4px",
  },
  fill: { height: "100%", transition: "width 0.3s" },

  image: {
    width: "100%",
    maxWidth: "320px",
    borderRadius: "12px",
    margin: "12px 0",
  },
  recommendation: {
    marginTop: "12px",
    backgroundColor: "#E6F6F8",
    padding: "14px",
    borderRadius: "10px",
    color: "#16808D",
  },
  downloadBtn: {
    marginTop: "20px",
    padding: "14px 22px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Dashboard;
