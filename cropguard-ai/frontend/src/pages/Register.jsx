import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const cropOptions = {
  Cereals: ["Wheat", "Rice", "Maize", "Barley"],
  Pulses: ["Chickpea", "Lentil", "Pigeon Pea"],
  "Cash Crops": ["Sugarcane", "Cotton"],
  Oilseeds: ["Soybean", "Groundnut", "Sunflower"],
  Fruits: ["Mango", "Banana", "Grapes"],
  Vegetables: ["Tomato", "Potato", "Onion"],
  Spices: ["Chilli", "Turmeric", "Ginger"],
};

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    cropCategory: "",
    cropType: "",
    cropInfo: "",
    plantationDate: "",
    farmSize: "",
    cultivationType: "",
  });

  const totalFields = Object.keys(formData).length;
  const filledFields = Object.values(formData).filter(
    (v) => v.trim() !== ""
  ).length;
  const progress = Math.round((filledFields / totalFields) * 100);
  const isComplete = progress === 100;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateGrowthStage = (plantationDate) => {
    const planted = new Date(plantationDate);
    const today = new Date();
    const diffDays = Math.floor(
      (today - planted) / (1000 * 60 * 60 * 24)
    );

    let stage = "Seedling";
    if (diffDays > 14 && diffDays <= 45) stage = "Vegetative";
    else if (diffDays > 45 && diffDays <= 75) stage = "Flowering";
    else if (diffDays > 75) stage = "Maturity";

    return { cropAgeDays: diffDays, growthStage: stage };
  };

  const handleRegister = () => {
    if (!isComplete) return;

    const growthData = calculateGrowthStage(formData.plantationDate);

    const finalProfile = {
      ...formData,
      ...growthData,
      registeredAt: new Date().toISOString(),
    };

    localStorage.setItem("farmerProfile", JSON.stringify(finalProfile));
    navigate("/home");
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.center}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Farmer Registration</h2>

          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <p style={styles.progressText}>{progress}% completed</p>

          <input
            name="fullName"
            placeholder="Farmer Name"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="location"
            placeholder="Farm Location"
            value={formData.location}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="cropCategory"
            value={formData.cropCategory}
            onChange={(e) =>
              setFormData({
                ...formData,
                cropCategory: e.target.value,
                cropType: "",
              })
            }
            style={styles.input}
          >
            <option value="">Select Crop Category</option>
            {Object.keys(cropOptions).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          {formData.cropCategory && (
            <select
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Crop Type</option>
              {cropOptions[formData.cropCategory].map((crop) => (
                <option key={crop}>{crop}</option>
              ))}
            </select>
          )}

          {formData.cropType && (
            <textarea
              name="cropInfo"
              placeholder="Additional crop information"
              value={formData.cropInfo}
              onChange={handleChange}
              style={styles.textarea}
            />
          )}

          <input
            type="date"
            name="plantationDate"
            value={formData.plantationDate}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="farmSize"
            value={formData.farmSize}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Farm Size</option>
            <option value="Small">Small (≤ 2 acres)</option>
            <option value="Medium">Medium (2–5 acres)</option>
            <option value="Large">Large (5+ acres)</option>
          </select>

          <select
            name="cultivationType"
            value={formData.cultivationType}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Cultivation Type</option>
            <option value="Open Field">Open Field</option>
            <option value="Greenhouse">Greenhouse</option>
            <option value="Polyhouse">Polyhouse</option>
          </select>

          <button
            disabled={!isComplete}
            onClick={handleRegister}
            style={{
              ...styles.button,
              opacity: isComplete ? 1 : 0.5,
              cursor: isComplete ? "pointer" : "not-allowed",
            }}
          >
            Register & Continue
          </button>
        </div>
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
    padding: "14px 16px",
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

  center: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 16px",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "32px 24px",
    borderRadius: "18px",
    width: "100%",
    maxWidth: "460px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  },

  heading: {
    textAlign: "center",
    color: "#142C52",
    marginBottom: "20px",
    fontSize: "22px",
  },

  progressTrack: {
    height: "8px",
    backgroundColor: "#e0e0e0",
    borderRadius: "6px",
    overflow: "hidden",
    marginBottom: "6px",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#22C55E",
    transition: "width 0.3s ease",
  },

  progressText: {
    fontSize: "13px",
    color: "#16808D",
    marginBottom: "16px",
    textAlign: "right",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    minHeight: "80px",
    resize: "none",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
  },
};

export default Register;
