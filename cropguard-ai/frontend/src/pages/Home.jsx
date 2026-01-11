import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.logoText}>CropGuard AI</h2>
        </div>

        <nav>
          <ul style={styles.navList}>
            <li>Home</li>
            <li>Upload</li>
            <li>Alerts</li>
            <li>Dashboard</li>
            <li>Profile</li>
            <li>Logout</li>
          </ul>
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Smart Crop Disease Detection</h1>

          <div style={styles.features}>
            <div style={styles.feature} onClick={() => navigate("/upload")}>
              Image-Based Detection
            </div>

            <div style={styles.feature} onClick={() => navigate("/disease-analysis")}>
              Disease Analysis
            </div>

            <div style={styles.feature}>Early Alerts</div>
            <div style={styles.feature}>Treatment Guidance</div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  app: { minHeight: "100vh", backgroundColor: "#f4f6f8" },
  header: {
    backgroundColor: "#142C52",
    color: "#fff",
    padding: "14px 32px",
    display: "flex",
    justifyContent: "space-between",
  },
  brand: { display: "flex", alignItems: "center", gap: "10px" },
  logo: { height: "36px", background: "#fff", padding: "6px", borderRadius: "6px" },
  logoText: { color: "#1B9AAA" },
  navList: { display: "flex", gap: "18px", listStyle: "none" },
  main: { padding: "80px", display: "flex", justifyContent: "center" },
  card: {
    background: "#fff",
    padding: "50px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    width: "900px",
  },
  heading: { color: "#142C52", textAlign: "center" },
  features: {
    marginTop: "40px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: "20px",
  },
  feature: {
    backgroundColor: "#1B9AAA",
    color: "#fff",
    padding: "18px",
    borderRadius: "12px",
    textAlign: "center",
    cursor: "pointer",
  },
};

export default Home;
