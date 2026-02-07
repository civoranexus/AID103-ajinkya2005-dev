import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate();
  const farmerProfile = JSON.parse(localStorage.getItem("activeFarmer"));
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI Logo" style={styles.logo} />
          <h2 style={styles.logoText}>CropGuard AI</h2>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <ul style={styles.navList}>
            <li style={styles.navItem} onClick={() => navigate("/home")}>
              Home
            </li>
            <li style={styles.navItem} onClick={() => navigate("/history")}>
              History
            </li>
            <li style={styles.navItem} onClick={() => navigate("/calendar")}>
              Crop Calendar
            </li>
            <li style={styles.navItem} onClick={() => navigate("/dashboard")}>
              Dashboard
            </li>
          </ul>

          {farmerProfile && (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                style={{
                  backgroundColor: "#1B9AAA",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                👤 {farmerProfile.fullName}
              </button>

              {showProfile && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "44px",
                    backgroundColor: "#ffffff",
                    padding: "16px",
                    borderRadius: "14px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    width: "220px",
                    zIndex: 100,
                    color: "#142C52",
                  }}
                >
                  <p style={{ fontWeight: "600", marginBottom: "4px" }}>
                    {farmerProfile.fullName}
                  </p>
                  <p style={{ fontSize: "13px", marginBottom: "10px" }}>
                    {farmerProfile.cropType} • {farmerProfile.location}
                  </p>

                  <hr style={{ margin: "10px 0" }} />

                  <button
                    onClick={() => {
                      localStorage.removeItem("activeFarmer");
                      window.location.href = "/";
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#DC2626",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Smart Crop Disease Detection</h1>
          <p style={styles.subText}>
            Upload crop images and receive AI-powered disease detection,
            personalized treatment plans, and explainable insights.
          </p>

          <div style={styles.actions}>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/upload")}
            >
              Upload Crop Image
            </button>

            <button
              style={styles.secondaryBtn}
              onClick={() => navigate("/analysis")}
            >
              Disease Analysis
            </button>

            <button
              style={styles.tertiaryBtn}
              onClick={() => navigate("/pests")}
            >
              Pest Detection
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f4f6f8",
  },
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
    height: "40px",
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
    fontWeight: "500",
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "50px",
    maxWidth: "800px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
  },
  heading: {
    color: "#142C52",
    marginBottom: "14px",
  },
  subText: {
    color: "#16808D",
    marginBottom: "30px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "14px 28px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "14px 28px",
    backgroundColor: "#16808D",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  tertiaryBtn: {
    padding: "14px 28px",
    backgroundColor: "#142C52",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Home;
