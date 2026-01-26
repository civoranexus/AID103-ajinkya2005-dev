import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function PestDetection() {
  const navigate = useNavigate();
  const [pests, setPests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPests = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:5000/api/pest-recommendations"
        );
        const data = await res.json();
        setPests(data.recommendations || []);
      } catch (err) {
        console.error("Failed to fetch pest data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPests();
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>Pest Detection & Control</h2>

        {loading && <p>Analyzing pest risks...</p>}

        {!loading && pests.length === 0 && (
          <p>No pest threats detected for current crop.</p>
        )}

        {pests.map((pest, idx) => (
          <div key={idx} style={styles.card}>
            <h3>{pest.name}</h3>
            <p><strong>Risk Reason:</strong> {pest.reason}</p>
            <p><strong>Control Method:</strong> {pest.control}</p>

            <a
              href={pest.buy_link}
              target="_blank"
              rel="noreferrer"
              style={styles.buyBtn}
            >
              Buy Recommended Product
            </a>
          </div>
        ))}

        <button style={styles.backBtn} onClick={() => navigate("/home")}>
          Back to Home
        </button>
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
  heading: { color: "#142C52", marginBottom: "24px" },
  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    marginBottom: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  buyBtn: {
    display: "inline-block",
    marginTop: "10px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600",
  },
  backBtn: {
    marginTop: "30px",
    padding: "14px",
    width: "100%",
    backgroundColor: "#142C52",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },
};

export default PestDetection;
