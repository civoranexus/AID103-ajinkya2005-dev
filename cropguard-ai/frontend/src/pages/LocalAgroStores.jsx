import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function LocalAgroStores() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("farmerProfile"));

    if (!profile?.location) return;

    fetch("http://localhost:5000/api/local-agro-stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: profile.location }),
    })
      .then((res) => res.json())
      .then((data) => setStores(data.stores || []))
      .catch(() => setStores([]));
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>Nearby Agro Stores</h2>

        {stores.length === 0 && (
          <p style={styles.empty}>
            No nearby agro stores found for your location.
          </p>
        )}

        {stores.map((store, idx) => (
          <div key={idx} style={styles.card}>
            <h3>{store.name}</h3>
            <p><strong>Products:</strong> {store.products.join(", ")}</p>
            <p><strong>Contact:</strong> {store.phone}</p>

            <a
              href={store.map_link}
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              View on Map
            </a>
          </div>
        ))}

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
  heading: { color: "#142C52", marginBottom: "30px" },
  empty: { color: "#16808D" },

  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    marginBottom: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  link: {
    color: "#1B9AAA",
    fontWeight: "600",
    textDecoration: "none",
  },

  backBtn: {
    marginTop: "30px",
    padding: "14px 28px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default LocalAgroStores;
