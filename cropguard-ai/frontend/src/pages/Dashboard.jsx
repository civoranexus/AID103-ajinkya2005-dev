import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/logo.png";

// If you were using Recharts earlier, keep these imports
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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("lastAnalysis"));
    if (stored) {
      setAnalysis(stored);
    }
  }, []);

  // ---- MOCK CHART DATA (already existed in your version) ----
  const chartData = [
    { name: "Low", value: 4 },
    { name: "Medium", value: 6 },
    { name: "High", value: 2 },
  ];

  // ---- PDF EXPORT ----
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

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>Dashboard Overview</h2>

        {/* ===== EXISTING OVERVIEW CARDS ===== */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <h4>Total Analyses</h4>
            <p>12</p>
          </div>
          <div style={styles.card}>
            <h4>High Risk Crops</h4>
            <p>2</p>
          </div>
          <div style={styles.card}>
            <h4>Active Alerts</h4>
            <p>3</p>
          </div>
        </div>

        {/* ===== EXISTING CHART ===== */}
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

        {/* ===== EXPORT SECTION (NEW, AT BOTTOM) ===== */}
        {analysis && (
          <div style={styles.exportSection}>
            <div style={styles.exportCard} id="dashboard-export">
              <h3>Latest Analysis Summary</h3>

              <img
                src={analysis.imagePreview}
                alt="Crop"
                style={styles.image}
              />

              <p><strong>Disease:</strong> {analysis.analysis.disease}</p>
              <p><strong>Severity:</strong> {analysis.analysis.severity}</p>
              <p>
                <strong>Confidence:</strong>{" "}
                {analysis.analysis.confidence * 100}%
              </p>

              <div style={styles.recommendation}>
                {analysis.analysis.recommendation}
              </div>
            </div>

            <button style={styles.downloadBtn} onClick={downloadPDF}>
              Download Latest Report (PDF)
            </button>
          </div>
        )}
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
  container: {
    padding: "60px 80px",
  },
  heading: {
    color: "#142C52",
    marginBottom: "30px",
  },
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
    marginBottom: "50px",
  },
  exportSection: {
    marginTop: "40px",
  },
  exportCard: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    maxWidth: "600px",
  },
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
