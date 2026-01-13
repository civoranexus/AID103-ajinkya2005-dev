import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import EarlyAlertsCard from "../components/EarlyAlertsCard";


function Home() {
  const navigate = useNavigate();
  const [showAlerts, setShowAlerts] = useState(false);

  return (
    <div style={styles.app}>
      {/* ===== NAVBAR ===== */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI Logo" style={styles.logo} />
          <h2 style={styles.logoText}>CropGuard AI</h2>
        </div>

        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>Home</li>
            <li style={styles.navItem} onClick={() => navigate("/upload")}>
              Upload
            </li>
            <li style={styles.navItem} onClick={() => setShowAlerts(true)}>
              Alerts
            </li>
            <li style={styles.navItem} onClick={() => navigate("/dashboard")}>
              Dashboard
            </li>

            <li style={styles.navItem} onClick={() => navigate("/profile")}>
              Profile
            </li>
            <li style={styles.navItem} onClick={() => navigate("/logout")}>
              Logout
            </li>
          </ul>
        </nav>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Smart Crop Disease Detection</h1>

          <div style={styles.features}>
            <div
              style={styles.feature}
              onClick={() => navigate("/upload")}
            >
              Image-Based Detection
            </div>

            <div
              style={styles.feature}
              onClick={() => navigate("/disease-analysis")}
            >
              Disease Analysis
            </div>

            <div
              style={styles.feature}
              onClick={() => setShowAlerts(true)}
            >
              Early Alerts
            </div>

            <div style={styles.feature}>
              Treatment Guidance
            </div>
          </div>
        </div>
      </main>

      {/* ===== EARLY ALERTS OVERLAY ===== */}
      {showAlerts && (
        <EarlyAlertsCard onClose={() => setShowAlerts(false)} />
      )}
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
  },

  /* NAVBAR */
  header: {
    backgroundColor: "#142C52",
    color: "#ffffff",
    padding: "14px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

  navList: {
    display: "flex",
    listStyle: "none",
    gap: "22px",
    margin: 0,
    padding: 0,
  },

  navItem: {
    cursor: "pointer",
    fontWeight: "400",
  },

  /* MAIN */
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 20px",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "50px",
    maxWidth: "900px",
    width: "100%",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  heading: {
    color: "#142C52",
    marginBottom: "40px",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
  },

  feature: {
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    padding: "18px",
    borderRadius: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
};

export default Home;
