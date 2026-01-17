import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function HistoryReports() {
  const navigate = useNavigate();
  const history =
    JSON.parse(localStorage.getItem("analysisHistory")) || [];

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.logoText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>History & Reports</h2>

        {history.length === 0 ? (
          <p style={styles.emptyText}>
            No analysis reports available yet.
          </p>
        ) : (
          <div style={styles.list}>
            {history.map((item) => (
              <div key={item.id} style={styles.card}>
                <div style={styles.row}>
                  <strong>Date:</strong> {item.date}
                </div>
                <div style={styles.row}>
                  <strong>Disease:</strong> {item.analysis.disease}
                </div>
                <div style={styles.row}>
                  <strong>Severity:</strong> {item.analysis.severity}
                </div>
                <div style={styles.row}>
                  <strong>Confidence:</strong>{" "}
                  {item.analysis.confidence * 100}%
                </div>

                <div style={styles.actions}>
                  <button
                    style={styles.secondaryBtn}
                    onClick={() => {
                      localStorage.setItem(
                        "lastAnalysis",
                        JSON.stringify(item)
                      );
                      navigate("/analysis");
                    }}
                  >
                    View Analysis
                  </button>

                  <button
                    style={styles.primaryBtn}
                    onClick={() => {
                      localStorage.setItem(
                        "lastAnalysis",
                        JSON.stringify(item)
                      );
                      navigate("/ai-assessment");
                    }}
                  >
                    View AI Assessment
                  </button>
                </div>
              </div>
            ))}
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
  logoText: {
    color: "#1B9AAA",
    margin: 0,
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "60px 20px",
  },
  heading: {
    color: "#142C52",
    marginBottom: "30px",
  },
  emptyText: {
    color: "#16808D",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  row: {
    marginBottom: "6px",
    color: "#142C52",
  },
  actions: {
    marginTop: "16px",
    display: "flex",
    gap: "12px",
  },
  primaryBtn: {
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
  secondaryBtn: {
    backgroundColor: "#16808D",
    color: "#ffffff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default HistoryReports;
