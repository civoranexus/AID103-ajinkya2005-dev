import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const crops = {
  Cereals: ["Rice", "Wheat", "Maize"],
  Pulses: ["Chickpea", "Lentil"],
  "Cash Crops": ["Sugarcane", "Cotton"],
  Oilseeds: ["Soybean", "Groundnut"],
};

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    location: "",
    cropCategory: "",
    cropName: "",
    cropInfo: "",
    plantingDate: "",
  });

  const progress =
    (form.name ? 20 : 0) +
    (form.location ? 20 : 0) +
    (form.cropCategory ? 20 : 0) +
    (form.cropName ? 20 : 0) +
    (form.plantingDate ? 20 : 0);

  const submit = () => {
    localStorage.setItem("farmerProfile", JSON.stringify(form));
    navigate("/home");
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} style={styles.logo} />
          <span>CropGuard AI</span>
        </div>
      </header>

      <div style={styles.card}>
        <div style={styles.progressWrap}>
          <div style={{ ...styles.progress, width: `${progress}%` }} />
        </div>

        <h2 style={styles.title}>Welcome to CropGuard AI</h2>

        <input
          style={styles.input}
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Farm Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <select
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, cropCategory: e.target.value, cropName: "" })
          }
        >
          <option value="">Select Crop Category</option>
          {Object.keys(crops).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {form.cropCategory && (
          <select
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, cropName: e.target.value })
            }
          >
            <option value="">Select Crop</option>
            {crops[form.cropCategory].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        )}

        <textarea
          style={styles.input}
          placeholder="Additional crop information"
          rows="3"
          onChange={(e) => setForm({ ...form, cropInfo: e.target.value })}
        />

        <input
          type="date"
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, plantingDate: e.target.value })
          }
        />

        <button
          disabled={progress !== 100}
          style={{
            ...styles.button,
            backgroundColor: progress === 100 ? "#1B9AAA" : "#9CA3AF",
          }}
          onClick={submit}
        >
          Register
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    background: "#142C52",
    padding: "14px 32px",
    color: "#1B9AAA",
  },
  brand: { display: "flex", alignItems: "center", gap: "10px" },
  logo: { height: "32px", background: "#fff", padding: "4px", borderRadius: "6px" },
  card: {
    marginTop: "60px",
    width: "460px",
    padding: "40px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
  },
  progressWrap: {
    height: "8px",
    background: "#e5e7eb",
    borderRadius: "6px",
    marginBottom: "20px",
  },
  progress: {
    height: "100%",
    background: "#22C55E",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#142C52",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "600",
  },
};

export default Register;
