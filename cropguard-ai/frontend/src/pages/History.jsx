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
      {/* NAVBAR */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      {/* CONTENT */}
      <div style={styles.container}>
        <h2 style={styles.heading}>History & Reports</h2>

        {history.length === 0 && (
          <p style={styles.empty}>No analysis history available.</p>
        )}

        {history.map((item) => (
          <div key={item.id} style={styles.card}>
            <div id={`report-${item.id}`} style={styles.report}>
              <h3 style={styles.cardTitle}>Crop Disease Report</h3>

              <p><strong>Date:</strong> {item.date}</p>

              <img
                src={item.imagePreview}
                alt="Crop"
                style={styles.image}
              />

              <p><strong>Disease:</strong> {item.analysis.disease}</p>
              <p><strong>Severity:</strong> {item.analysis.severity}</p>
              <p>
                <strong>Confidence:</strong>{" "}
                {item.analysis.confidence * 100}%
              </p>

              <div style={styles.recommendation}>
                {item.analysis.recommendation}
              </div>
            </div>

            <button
              style={styles.exportBtn}
              onClick={() => exportPDF(item)}
            >
              Export PDF
            </button>
          </div>
        ))}
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
  empty: {
    color: "#16808D",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "30px",
    marginBottom: "24px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
  },
  report: {
    color: "#142C52",
  },
  cardTitle: {
    marginBottom: "10px",
  },
  image: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "12px",
    margin: "12px 0",
  },
  recommendation: {
    marginTop: "10px",
    backgroundColor: "#E6F6F8",
    padding: "12px",
    borderRadius: "10px",
    color: "#16808D",
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
