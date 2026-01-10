import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate();
  const [panel, setPanel] = useState(null);
  const profile = JSON.parse(localStorage.getItem("farmerProfile"));

  const logout = () => {
    localStorage.removeItem("farmerProfile");
    navigate("/");
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} style={styles.logo} />
          <h2 style={styles.logoText}>CropGuard AI</h2>
        </div>

        <nav style={styles.nav}>
          {["Home", "Upload", "Alerts", "Dashboard", "About"].map((i) => (
            <span key={i} onClick={() => setPanel(i)}>
              {i}
            </span>
          ))}
          <span onClick={() => setPanel("Profile")}>Profile</span>
          <span onClick={logout}>Logout</span>
        </nav>
      </header>

      {panel && (
        <div style={styles.dropdown}>
          {panel === "Upload" && (
            <button
              style={styles.action}
              onClick={() => navigate("/survey/image-detection")}
            >
              Image-Based Detection
            </button>
          )}

          {panel === "Profile" && (
            <div>
              <p>Name: {profile?.name}</p>
              <p>Location: {profile?.location}</p>
              <button
                style={styles.action}
                onClick={() => navigate("/")}
              >
                Edit Profile
              </button>
            </div>
          )}

          {panel !== "Upload" && panel !== "Profile" && (
            <p>{panel} information panel</p>
          )}
        </div>
      )}

      <main style={styles.main}>
        <div style={styles.card}>
          <h1>Smart Crop Disease Detection</h1>

          <div style={styles.features}>
            <div style={styles.feature}>Image-Based Detection</div>
            <div style={styles.feature}>Disease Analytics</div>
            <div style={styles.feature}>Risk Assessment</div>
            <div style={styles.feature}>Treatment Guidance</div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  app: { minHeight: "100vh", background: "#f4f6f8" },
  header: {
    background: "#142C52",
    padding: "14px 32px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
  },
  brand: { display: "flex", alignItems: "center", gap: "10px" },
  logo: { height: "36px", background: "#fff", padding: "5px", borderRadius: "6px" },
  logoText: { color: "#1B9AAA" },
  nav: { display: "flex", gap: "20px", cursor: "pointer" },
  dropdown: {
    background: "#fff",
    padding: "30px",
    margin: "20px auto",
    width: "80%",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  action: {
    padding: "10px 16px",
    background: "#1B9AAA",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    marginTop: "10px",
  },
  main: { display: "flex", justifyContent: "center", padding: "80px" },
  card: {
    background: "#fff",
    padding: "50px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  features: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  feature: {
    background: "#1B9AAA",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
  },
};

export default Home;
