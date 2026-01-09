import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

/* ===== Crop Categories & Crops ===== */
const cropData = {
  Cereals: ["Rice", "Wheat", "Maize", "Barley"],
  Pulses: ["Chickpea", "Pigeon Pea", "Lentil"],
  "Cash Crops": ["Sugarcane", "Cotton", "Jute"],
  Oilseeds: ["Soybean", "Groundnut", "Mustard"],
  "Horticultural Crops": ["Tomato", "Onion", "Potato"],
  "Plantation Crops": ["Tea", "Coffee", "Rubber"],
  Spices: ["Chilli", "Turmeric", "Ginger"],
};

function Register() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(null);
  const [form, setForm] = useState({
    name: "",
    cropCategory: "",
    cropName: "",
    cropInfo: "",
    plantingDate: "",
    location: "",
  });

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateProgress = () => {
    let progress = 0;
    if (form.name) progress += 20;
    if (form.cropCategory) progress += 20;
    if (form.cropName) progress += 20;
    if (form.plantingDate) progress += 20;
    if (form.location) progress += 20;
    return progress;
  };

  const progress = calculateProgress();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (progress !== 100) return;
    localStorage.setItem("farmerProfile", JSON.stringify(form));
    navigate("/home");
  };

  return (
    <div style={styles.page}>
      {/* ===== NAVBAR ===== */}
      <header style={styles.navbar}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI Logo" style={styles.logo} />
          <span style={styles.brandText}>CropGuard AI</span>
        </div>

        <nav style={styles.navLinks}>
          {[
            {
              key: "about",
              label: "About",
              text:
                "CropGuard AI is an AI-powered crop disease detection and advisory system designed to support farmers with timely and informed decisions.",
            },
            {
              key: "how",
              label: "How It Works",
              text:
                "Farmers register their farm details, upload crop images, and receive AI-driven disease analysis and treatment guidance.",
            },
            {
              key: "features",
              label: "Features",
              text:
                "Image-based detection, crop-specific risk assessment, early alerts, and advisory insights.",
            },
            {
              key: "contact",
              label: "Contact",
              text:
                "For assistance and support, please contact the Civora Nexus team through official communication channels.",
            },
          ].map((item) => (
            <div
              key={item.key}
              style={styles.navItem}
              onClick={() => toggleMenu(item.key)}
            >
              <span style={styles.navLabel}>
                {item.label}
                <span
                  style={{
                    ...styles.arrow,
                    transform:
                      activeMenu === item.key
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                >
                  ▾
                </span>
              </span>

              <div
                style={{
                  ...styles.dropdown,
                  ...(activeMenu === item.key
                    ? styles.dropdownOpen
                    : styles.dropdownClosed),
                }}
              >
                {item.text}
              </div>
            </div>
          ))}
        </nav>
      </header>

      {/* ===== REGISTRATION FORM ===== */}
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Progress Indicator */}
          <div style={styles.progressContainer}>
            <div
              style={{
                ...styles.progressBar,
                width: `${progress}%`,
              }}
            />
          </div>

          <h3 style={styles.welcomeText}>Welcome to CropGuard AI</h3>
          <h2 style={styles.heading}>Farmer Registration</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div>
              <div style={styles.label}>Farmer Name</div>
              <input
                name="name"
                placeholder="Enter full name"
                value={form.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div>
              <div style={styles.label}>Crop Category</div>
              <select
                value={form.cropCategory}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cropCategory: e.target.value,
                    cropName: "",
                    cropInfo: "",
                  })
                }
                required
                style={styles.input}
              >
                <option value="">Select crop category</option>
                {Object.keys(cropData).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {form.cropCategory && (
              <div>
                <div style={styles.label}>Crop Name</div>
                <select
                  value={form.cropName}
                  onChange={(e) =>
                    setForm({ ...form, cropName: e.target.value })
                  }
                  required
                  style={styles.input}
                >
                  <option value="">Select crop</option>
                  {cropData[form.cropCategory].map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {form.cropName && (
              <div>
                <div style={styles.label}>Additional Crop Information</div>
                <textarea
                  value={form.cropInfo}
                  onChange={(e) =>
                    setForm({ ...form, cropInfo: e.target.value })
                  }
                  rows="3"
                  placeholder="Variety, growth stage, or other relevant details"
                  style={styles.textarea}
                />
              </div>
            )}

            <div>
              <div style={styles.label}>Planting Date</div>
              <input
                type="date"
                name="plantingDate"
                value={form.plantingDate}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div>
              <div style={styles.label}>Farm Location</div>
              <input
                name="location"
                placeholder="Village / District / Region"
                value={form.location}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <button
              type="submit"
              disabled={progress !== 100}
              style={{
                ...styles.button,
                ...(progress !== 100 ? styles.buttonDisabled : {}),
              }}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
  },

  navbar: {
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
    gap: "10px",
  },

  logo: {
    height: "36px",
    backgroundColor: "#ffffff",
    padding: "5px",
    borderRadius: "6px",
  },

  brandText: {
    color: "#1B9AAA",
    fontWeight: "600",
    fontSize: "18px",
  },

  navLinks: {
    display: "flex",
    gap: "24px",
  },

  navItem: {
    position: "relative",
    cursor: "pointer",
  },

  navLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  arrow: {
    fontSize: "12px",
    transition: "transform 0.25s ease",
  },

  dropdown: {
    position: "absolute",
    top: "34px",
    right: 0,
    width: "300px",
    backgroundColor: "#ffffff",
    color: "#142C52",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    fontSize: "14px",
    transition: "all 0.3s ease",
    transformOrigin: "top",
    zIndex: 20,
  },

  dropdownOpen: {
    opacity: 1,
    transform: "translateY(0) scale(1)",
    pointerEvents: "auto",
  },

  dropdownClosed: {
    opacity: 0,
    transform: "translateY(-10px) scale(0.95)",
    pointerEvents: "none",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 20px",
  },

  card: {
    width: "460px",
    background:
      "linear-gradient(180deg, #ffffff 0%, #f9fbfc 100%)",
    padding: "44px",
    borderRadius: "16px",
    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
    borderLeft: "6px solid #1B9AAA",
  },

  progressContainer: {
    width: "100%",
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "6px",
    overflow: "hidden",
    marginBottom: "22px",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#22C55E",
    transition: "width 0.3s ease",
  },

  welcomeText: {
    textAlign: "center",
    color: "#1B9AAA",
    marginBottom: "6px",
    fontWeight: "500",
  },

  heading: {
    textAlign: "center",
    marginBottom: "26px",
    color: "#142C52",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#142C52",
    marginBottom: "4px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    marginTop: "18px",
    padding: "14px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  },

  buttonDisabled: {
    backgroundColor: "#9CA3AF",
    cursor: "not-allowed",
  },
};

export default Register;
