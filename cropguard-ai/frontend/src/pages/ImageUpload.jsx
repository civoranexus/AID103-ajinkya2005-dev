import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function ImageUpload() {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      // ---- CALL BACKEND ----
      const res = await fetch("http://127.0.0.1:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // ---- IMAGE PREVIEW ----
      const preview = URL.createObjectURL(file);

      const analysisRecord = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        imagePreview: preview,
        analysis: data.analysis,
      };

      // ---- SAVE LAST ANALYSIS ----
      localStorage.setItem(
        "lastAnalysis",
        JSON.stringify(analysisRecord)
      );

      // ---- SAVE HISTORY ----
      const history =
        JSON.parse(localStorage.getItem("analysisHistory")) || [];

      history.push(analysisRecord);

      localStorage.setItem(
        "analysisHistory",
        JSON.stringify(history)
      );

      // ---- SUCCESS ----
      setSuccess(true);

      setTimeout(() => {
        navigate("/home");
      }, 1500);

    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      {/* CONTENT */}
      <div style={styles.center}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Image-Based Detection</h2>

          <label style={styles.uploadBox}>
            Select crop image
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: "none" }}
              disabled={success}
            />
          </label>

          {success && (
            <div style={styles.success}>
              Image uploaded successfully. Redirecting to Home...
            </div>
          )}
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
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "80px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "18px",
    width: "420px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    textAlign: "center",
  },
  heading: {
    color: "#142C52",
    marginBottom: "30px",
  },
  uploadBox: {
    display: "block",
    padding: "16px",
    borderRadius: "12px",
    border: "2px dashed #1B9AAA",
    color: "#16808D",
    cursor: "pointer",
  },
  success: {
    marginTop: "20px",
    backgroundColor: "#E6F6F8",
    color: "#16808D",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "600",
  },
};

export default ImageUpload;
