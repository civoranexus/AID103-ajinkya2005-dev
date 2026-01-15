import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.app}>
      {/* NAVBAR */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI Logo" style={styles.logo} />
          <h2 style={styles.logoText}>CropGuard AI</h2>
        </div>

        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem} onClick={() => navigate("/home")}>
              Home
            </li>
            <li style={styles.navItem} onClick={() => navigate("/history")}>
  History 
</li>

            <li style={styles.navItem} onClick={() => navigate("/dashboard")}>
              Dashboard
            </li>
          </ul>
        </nav>
      </header>

      {/* MAIN CONTENT */}
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
};

export default Home;
