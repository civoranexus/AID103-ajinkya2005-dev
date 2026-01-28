import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function CropCalendar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("farmerProfile"));
    if (storedProfile) {
      setProfile(storedProfile);
      generateCalendar(storedProfile);
    }
  }, []);

  const generateCalendar = (data) => {
    const baseStages = [
      { stage: "Land Preparation", days: "Day 1 – Day 7" },
      { stage: "Sowing / Transplanting", days: "Day 8 – Day 14" },
      { stage: "Vegetative Growth", days: "Day 15 – Day 45" },
      { stage: "Flowering Stage", days: "Day 46 – Day 65" },
      { stage: "Pest & Disease Monitoring", days: "Day 30 – Day 75" },
      { stage: "Harvest Window", days: "Day 80 – Day 110" },
    ];

    setCalendar(baseStages);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>Crop Calendar</h2>

        {profile && (
          <div style={styles.profileCard}>
            <p><strong>Farmer:</strong> {profile.fullName}</p>
            <p><strong>Crop:</strong> {profile.cropType}</p>
            <p><strong>Location:</strong> {profile.location}</p>
          </div>
        )}

        <div style={styles.timeline}>
          {calendar.map((item, index) => (
            <div key={index} style={styles.stageCard}>
              <h4>{item.stage}</h4>
              <span>{item.days}</span>
            </div>
          ))}
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/home")}>
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
    marginBottom: "24px",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    color: "#142C52",
  },
  timeline: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  stageCard: {
    backgroundColor: "#ffffff",
    padding: "22px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    color: "#142C52",
  },
  backBtn: {
    marginTop: "40px",
    padding: "14px 26px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default CropCalendar;
