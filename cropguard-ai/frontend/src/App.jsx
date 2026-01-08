import logo from "./assets/logo.png";

function App() {
  return (
    <div style={styles.app}>
      
      {/* ===== TOP NAVIGATION BAR ===== */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI Logo" style={styles.logoImage} />
          <h2 style={styles.logoText}>CropGuard AI</h2>
        </div>

        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>Home</li>
            <li style={styles.navItem}>Upload</li>
            <li style={styles.navItem}>Alerts</li>
            <li style={styles.navItem}>Dashboard</li>
            <li style={styles.navItem}>About</li>
          </ul>
        </nav>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Smart Crop Disease Detection</h1>
          <p style={styles.subText}>
            CropGuard AI uses artificial intelligence to detect crop diseases
            early and provide actionable insights to farmers.
          </p>

          <div style={styles.features}>
            <div style={styles.featureBox}>🌿 Image-Based Detection</div>
            <div style={styles.featureBox}>📊 Risk Assessment</div>
            <div style={styles.featureBox}>🚨 Early Alerts</div>
            <div style={styles.featureBox}>🧪 Treatment Guidance</div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f4f6f8",
  },

  /* NAVBAR */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 32px",
    backgroundColor: "#142C52",
    color: "#ffffff",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logoImage: {
    height: "42px",
    width: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "6px",
    },

  logoText: {
    margin: 0,
    fontWeight: "600",
    color: "#1B9AAA",
  },

  navList: {
    listStyle: "none",
    display: "flex",
    gap: "22px",
    margin: 0,
    padding: 0,
  },

  navItem: {
    cursor: "pointer",
    fontWeight: "400",
    color: "#ffffff",
  },

  /* MAIN SECTION */
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 20px",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "42px",
    maxWidth: "850px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  heading: {
    color: "#142C52",
    marginBottom: "12px",
  },

  subText: {
    color: "#16808D",
    fontSize: "16px",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "18px",
    marginTop: "34px",
  },

  featureBox: {
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    padding: "16px",
    borderRadius: "10px",
    fontWeight: "500",
  },
};

export default App;
