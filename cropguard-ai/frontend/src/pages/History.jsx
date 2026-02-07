import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/logo.png";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("analysisHistory")) || [];
    setHistory(stored.reverse());
  }, []);

  const getColor = (level) =>
    level === "High"
      ? "#DC2626"
      : level === "Medium"
      ? "#F59E0B"
      : "#16A34A";

  /* 🔹 ADDITION: Save treatment outcome */
  const saveOutcome = (id, outcome) => {
    const updated = history.map((item) =>
      item.id === id
        ? {
            ...item,
            treatmentOutcome: outcome,
            followUpDate: new Date().toLocaleDateString(),
          }
        : item
    );

    setHistory(updated);

    const original =
      JSON.parse(localStorage.getItem("analysisHistory")) || [];

    const merged = original.map((item) =>
      item.id === id
        ? {
            ...item,
            treatmentOutcome: outcome,
            followUpDate: new Date().toLocaleDateString(),
          }
        : item
    );

    localStorage.setItem(
      "analysisHistory",
      JSON.stringify(merged)
    );
  };

  const exportPDF = async (item) => {
    const element = document.getElementById(`report-${item.id}`);
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 10, width, height);
    pdf.save(`CropGuard_Report_${item.id}.pdf`);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>History & Reports</h2>

        {history.length === 0 && (
          <p style={styles.empty}>No analysis history available.</p>
        )}

        {history.map((item) => {
          const color = getColor(item.analysis.risk_level);

          return (
            <div key={item.id} style={styles.card}>
              <div id={`report-${item.id}`} style={styles.report}>
                <h3 style={styles.cardTitle}>Crop Disease Report</h3>

                <div style={styles.indicatorRow}>
                  <span
                    style={{
                      ...styles.riskBadge,
                      backgroundColor: color,
                    }}
                  >
                    Risk: {item.analysis.risk_level}
                  </span>

                  <span
                    style={{
                      ...styles.severity,
                      color: color,
                    }}
                  >
                    Severity: {item.analysis.severity}
                  </span>
                </div>

                <p><strong>Date:</strong> {item.date}</p>

                <img
                  src={item.imagePreview}
                  alt="Crop"
                  style={styles.image}
                />

                <p><strong>Disease:</strong> {item.analysis.disease}</p>

                <div style={styles.confidenceBlock}>
                  <span>
                    <strong>Confidence:</strong>{" "}
                    {Math.round(item.analysis.confidence * 100)}%
                  </span>

                  <div style={styles.track}>
                    <div
                      style={{
                        ...styles.fill,
                        width: `${item.analysis.confidence * 100}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>

                <div style={styles.recommendation}>
                  {item.analysis.recommendation}
                </div>

                {/* 🔹 ADDITION: TREATMENT EFFECTIVENESS */}
                <div style={styles.treatmentBox}>
                  <strong>Treatment Outcome</strong>

                  {item.treatmentOutcome ? (
                    <p>
                      Outcome:{" "}
                      <strong>{item.treatmentOutcome}</strong>
                      <br />
                      Follow-up Date: {item.followUpDate}
                    </p>
                  ) : (
                    <div style={styles.outcomeBtns}>
                      <button
                        style={styles.goodBtn}
                        onClick={() =>
                          saveOutcome(item.id, "Improved")
                        }
                      >
                        Improved
                      </button>
                      <button
                        style={styles.warnBtn}
                        onClick={() =>
                          saveOutcome(item.id, "No Change")
                        }
                      >
                        Same
                      </button>
                      <button
                        style={styles.badBtn}
                        onClick={() =>
                          saveOutcome(item.id, "Worsened")
                        }
                      >
                        Worsened
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                style={styles.exportBtn}
                onClick={() => exportPDF(item)}
              >
                Export PDF
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", backgroundColor: "#f4f6f8" },
  header: { backgroundColor: "#142C52", padding: "14px 32px" },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  logo: { height: "36px", backgroundColor: "#ffffff", padding: "6px", borderRadius: "8px" },
  brandText: { color: "#1B9AAA", margin: 0 },
  container: { padding: "60px 80px" },
  heading: { color: "#142C52", marginBottom: "30px" },
  empty: { color: "#16808D" },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "30px",
    marginBottom: "24px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
  },
  report: { color: "#142C52" },
  cardTitle: { marginBottom: "10px" },

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
  severity: { fontWeight: "600" },

  image: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "12px",
    margin: "12px 0",
  },

  confidenceBlock: { marginTop: "10px" },
  track: {
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "6px",
    overflow: "hidden",
    marginTop: "4px",
  },
  fill: { height: "100%" },

  recommendation: {
    marginTop: "10px",
    backgroundColor: "#E6F6F8",
    padding: "12px",
    borderRadius: "10px",
    color: "#16808D",
  },

  /* 🔹 ADDITION STYLES */
  treatmentBox: {
    marginTop: "14px",
    backgroundColor: "#F9FAFB",
    padding: "14px",
    borderRadius: "10px",
  },
  outcomeBtns: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  goodBtn: {
    backgroundColor: "#16A34A",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
  },
  warnBtn: {
    backgroundColor: "#F59E0B",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
  },
  badBtn: {
    backgroundColor: "#DC2626",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
  },

  exportBtn: {
    marginTop: "16px",
    padding: "12px 18px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default History;
