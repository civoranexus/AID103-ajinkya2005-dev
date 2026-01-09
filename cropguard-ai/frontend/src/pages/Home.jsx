import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

function Home() {
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("farmerProfile");
    if (data) {
      setProfile(JSON.parse(data));
    }
  }, []);

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI Logo" style={styles.logo} />
          <h2 style={styles.logoText}>CropGuard AI</h2>
        </div>

        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem} onClick={() => setShowProfile(false)}>Home</li>
            <li style={styles.navItem}>Upload</li>
            <li style={styles.navItem}>Alerts</li>
            <li style={styles.navItem}>Dashboard</li>
            <li style={styles.navItem} onClick={() => setShowProfile(true)}>Profile</li>
          </ul>
        </nav>
      </header>

      <main style={styles.main}>
        {!showProfile && (
          <div style={styles.card}>
            <h1 style={styles.heading}>Smart Crop Disease Detection</h1>
            <p style={styles.subText}>
              CropGuard AI uses artificial intelligence to detect crop diseases
              early and provide actionable insights to farmers.
            </p>

            <div style={styles.features}>
              <div style={styles.feature}>Image-Based Detection</div>
              <div style={styles.feature}>Risk Assessment</div>
              <div style={styles.feature}>Early Alerts</div>
              <div style={styles.feature}>Treatment Guidance</div>
            </div>
          </div>
        )}

        {showProfile && profile && (
          <div style={styles.profileCard}>
            <h2 style={styles.profileHeading}>Farmer Profile</h2>

            <div style={styles.profileRow}>
              <span>Name</span>
              <span>{profile.name}</span>
            </div>

            <div style={styles.profileRow}>
              <span>Crop Category</span>
              <span>{profile.cropCategory}</span>
            </div>

            <div style={styles.profileRow}>
              <span>Crop Name</span>
              <span>{profile.cropName}</span>
            </div>

            <div style={styles.profileRow}>
              <span>Additional Info</span>
              <span>{profile.cropInfo || "Not provided"}</span>
            </div>

            <div style={styles.profileRow}>
              <span>Planting Date</span>
              <span>{profile.plantingDate}</span>
            </div>

            <div style={styles.profileRow}>
              <span>Location</span>
              <span>{profile.location}</span>
            </div>
          </div>
        )}
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
    maxWidth: "900px",
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
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  feature: {
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    padding: "16px",
    borderRadius: "10px",
    fontWeight: "500",
  },

  /* ===== PROFILE CARD ===== */
  profileCard: {
    width: "520px",
    background:
      "linear-gradient(180deg, #ffffff 0%, #f9fbfc 100%)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
    borderLeft: "6px solid #1B9AAA",
  },
  profileHeading: {
    marginBottom: "24px",
    color: "#142C52",
  },
  profileRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #e5e7eb",
    color: "#142C52",
    fontSize: "14px",
  },
};

export default Home;
