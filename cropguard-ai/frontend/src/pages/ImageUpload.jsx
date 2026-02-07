import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function ImageUpload() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [success, setSuccess] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoRef.current.srcObject = stream;
    setCameraOn(true);
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    stream.getTracks().forEach((track) => track.stop());
    setCameraOn(false);
  };

  const captureImage = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);
    stopCamera();

    canvas.toBlob(async (blob) => {
      sendToBackend(blob);
    }, "image/jpeg");
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    sendToBackend(file);
  };

  const sendToBackend = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("http://127.0.0.1:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const preview = URL.createObjectURL(file);

      const analysisRecord = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        imagePreview: preview,
        analysis: data.analysis,
      };

      localStorage.setItem("lastAnalysis", JSON.stringify(analysisRecord));

      const history =
        JSON.parse(localStorage.getItem("analysisHistory")) || [];
      history.push(analysisRecord);
      localStorage.setItem("analysisHistory", JSON.stringify(history));

      setSuccess(true);
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

      <div style={styles.center}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Image-Based Detection</h2>

          {!cameraOn && (
            <>
              <label style={styles.uploadBox}>
                Upload Crop Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  style={{ display: "none" }}
                  disabled={loading}
                />
              </label>

              <button style={styles.cameraBtn} onClick={startCamera}>
                Use Camera
              </button>
            </>
          )}

          {cameraOn && (
            <>
              <video
                ref={videoRef}
                autoPlay
                style={styles.video}
              />
              <button style={styles.captureBtn} onClick={captureImage}>
                Capture Image
              </button>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />

          {loading && (
            <div style={styles.info}>Analyzing image…</div>
          )}

          {success && (
            <div style={styles.success}>
              Image processed successfully. Redirecting…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", backgroundColor: "#f4f6f8" },
  header: { backgroundColor: "#142C52", padding: "14px 32px" },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  logo: { height: "36px", backgroundColor: "#fff", padding: "6px", borderRadius: "8px" },
  brandText: { color: "#1B9AAA", margin: 0 },

  center: { display: "flex", justifyContent: "center", paddingTop: "80px" },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "18px",
    width: "420px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  },

  heading: { marginBottom: "20px" },

  uploadBox: {
    display: "block",
    padding: "16px",
    borderRadius: "12px",
    border: "2px dashed #1B9AAA",
    color: "#16808D",
    cursor: "pointer",
    marginBottom: "16px",
  },

  cameraBtn: {
    padding: "12px",
    backgroundColor: "#142C52",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    width: "100%",
  },

  video: {
    width: "100%",
    borderRadius: "12px",
    marginBottom: "12px",
  },

  captureBtn: {
    padding: "12px",
    backgroundColor: "#1B9AAA",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    width: "100%",
  },

  info: {
    marginTop: "16px",
    color: "#16808D",
    fontWeight: "600",
  },

  success: {
    marginTop: "16px",
    backgroundColor: "#E6F6F8",
    color: "#16808D",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "600",
  },
};

export default ImageUpload;
