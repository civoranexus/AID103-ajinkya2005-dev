import { useState } from "react";

function ImageSurvey() {
  const [image, setImage] = useState(null);

  const submit = async () => {
    const data = new FormData();
    data.append("image", image);

    await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      body: data,
    });

    alert("Image sent for analysis");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Image-Based Detection Survey</h2>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button style={styles.button} onClick={submit}>
          Upload Image
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
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    width: "400px",
    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
  },
  button: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    background: "#1B9AAA",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
  },
};

export default ImageSurvey;
