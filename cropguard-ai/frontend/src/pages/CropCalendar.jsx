import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function CropCalendar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [calendar, setCalendar] = useState([]);
  const [irrigation, setIrrigation] = useState([]);
  const [weatherRisk, setWeatherRisk] = useState([]);
  const [loadingWeather, setLoadingWeather] = useState(false);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("farmerProfile"));
    if (storedProfile) {
      setProfile(storedProfile);
      generateCalendar();
      generateIrrigation();
      fetchWeatherRisk(storedProfile.location);
    }
  }, []);

  const riskColor = (level) =>
    level === "High"
      ? "#DC2626"
      : level === "Medium"
      ? "#F59E0B"
      : "#16A34A";

  const generateCalendar = () => {
    setCalendar([
      {
        stage: "Land Preparation",
        pestRisk: "Low",
        diseaseRisk: "Low",
        action: "Soil sanitation and drainage planning",
      },
      {
        stage: "Vegetative Growth",
        pestRisk: "High",
        diseaseRisk: "Medium",
        action: "Active scouting and preventive sprays",
      },
      {
        stage: "Flowering Stage",
        pestRisk: "High",
        diseaseRisk: "High",
        action: "Critical crop protection stage",
      },
      {
        stage: "Harvest Window",
        pestRisk: "Low",
        diseaseRisk: "Low",
        action: "Minimal chemical use",
      },
    ]);
  };

  const generateIrrigation = () => {
    setIrrigation([
      {
        stage: "Early Growth",
        frequency: "Every 3–4 days",
        water: "Medium",
        note: "Maintain moist soil, avoid waterlogging",
      },
      {
        stage: "Vegetative Stage",
        frequency: "Every 2–3 days",
        water: "High",
        note: "Rapid growth requires consistent moisture",
      },
      {
        stage: "Flowering",
        frequency: "Daily light irrigation",
        water: "High",
        note: "Water stress reduces yield",
      },
      {
        stage: "Pre-Harvest",
        frequency: "Reduce irrigation",
        water: "Low",
        note: "Prevents fungal growth",
      },
    ]);
  };

  const fetchWeatherRisk = async (location) => {
    try {
      setLoadingWeather(true);
      const res = await fetch("http://localhost:5000/api/weather-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location }),
      });
      const data = await res.json();
      setWeatherRisk(data.forecast || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingWeather(false);
    }
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
        <h2 style={styles.heading}>Crop Calendar & Irrigation Planner</h2>

        {profile && (
          <div style={styles.profileCard}>
            <p><strong>Farmer:</strong> {profile.fullName}</p>
            <p><strong>Crop:</strong> {profile.cropType}</p>
            <p><strong>Location:</strong> {profile.location}</p>
          </div>
        )}

        <h3 style={styles.sectionTitle}>
          7-Day Weather & Environmental Risk Outlook
        </h3>

        {loadingWeather && <p>Loading weather insights...</p>}

        <div style={styles.grid}>
          {weatherRisk.map((day, i) => (
            <div key={i} style={styles.card}>
              <h4>{day.date}</h4>
              <p>🌡 {day.temp}°C</p>
              <p>💧 Humidity: {day.humidity}%</p>
              <p>🌧 Rain: {day.rainChance}%</p>

              <span
                style={{
                  ...styles.badge,
                  backgroundColor: riskColor(day.risk),
                }}
              >
                Risk: {day.risk}
              </span>

              <p style={styles.note}>{day.insight}</p>
            </div>
          ))}
        </div>

        <h3 style={styles.sectionTitle}>Disease & Pest Risk Calendar</h3>

        <div style={styles.grid}>
          {calendar.map((item, i) => (
            <div key={i} style={styles.card}>
              <h4>{item.stage}</h4>

              <span
                style={{
                  ...styles.badge,
                  backgroundColor: riskColor(item.pestRisk),
                }}
              >
                Pest: {item.pestRisk}
              </span>

              <span
                style={{
                  ...styles.badge,
                  backgroundColor: riskColor(item.diseaseRisk),
                }}
              >
                Disease: {item.diseaseRisk}
              </span>

              <p style={styles.note}>{item.action}</p>
            </div>
          ))}
        </div>

        <h3 style={styles.sectionTitle}>Irrigation Planner</h3>

        <div style={styles.grid}>
          {irrigation.map((item, i) => (
            <div key={i} style={styles.card}>
              <h4>{item.stage}</h4>

              <span
                style={{
                  ...styles.badge,
                  backgroundColor: riskColor(item.water),
                }}
              >
                Water Level: {item.water}
              </span>

              <p><strong>Schedule:</strong> {item.frequency}</p>
              <p style={styles.note}>{item.note}</p>
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
  heading: { color: "#142C52", marginBottom: "20px" },
  sectionTitle: {
    marginTop: "30px",
    marginBottom: "14px",
    color: "#142C52",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    padding: "18px",
    borderRadius: "14px",
    marginBottom: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    color: "#142C52",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    color: "#142C52",
  },
  badge: {
    display: "inline-block",
    marginRight: "6px",
    marginBottom: "6px",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  note: { fontSize: "14px", opacity: 0.9 },
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
