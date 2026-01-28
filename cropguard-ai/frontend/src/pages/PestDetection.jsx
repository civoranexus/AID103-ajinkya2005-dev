import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function PestDetection() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("lastAnalysis"));

  const [pests, setPests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stored) return;

    fetch("http://127.0.0.1:5000/api/pest-recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        disease: stored.analysis.disease,
        severity: stored.analysis.severity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPests(data.detected_pests || []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>Pest Detection & Control</h2>

        {loading && <p style={styles.info}>Analyzing pest threats...</p>}

        {!loading && pests.length === 0 && (
          <p style={styles.info}>
            No pest threats detected for current crop condition.
          </p>
        )}

        {pests.map((pest, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.row}>
              <h3>{pest.name}</h3>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor:
                    pest.risk === "High"
                      ? "#DC2626"
                      : pest.risk === "Medium"
                      ? "#F59E0B"
                      : "#16A34A",
                }}
              >
                {pest.risk} Risk
              </span>
            </div>

            <p><strong>Reason:</strong> {pest.reason}</p>
            <p><strong>Recommended Control:</strong> {pest.control}</p>

            <a
              href={pest.buy_link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Buy Control Product
            </a>
          </div>
        ))}

        <button style={styles.button} onClick={() => navigate("/home")}>
          Back to Home
        </button>
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
  info: {
    color: "#16808D",
    fontSize: "16px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "18px",
    marginBottom: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    color: "#142C52",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  badge: {
    color: "#ffffff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    color: "#1B9AAA",
    fontWeight: "600",
    textDecoration: "none",
  },
  button: {
    marginTop: "30px",
    padding: "14px 24px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default PestDetection;
