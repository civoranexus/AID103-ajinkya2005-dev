function EarlyAlertsCard({ onClose }) {
  const stored = JSON.parse(localStorage.getItem("lastAnalysis"));

  if (!stored) return null;

  const { analysis } = stored;

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Early Alerts & Risk Summary</h2>

        <section style={styles.section}>
          <h4 style={styles.subHeading}>Crop Summary</h4>
          <p>Disease: {analysis.disease}</p>
          <p>Severity: {analysis.severity}</p>
          <p>Risk Level: High</p>
        </section>

        <section style={styles.section}>
          <h4 style={styles.subHeading}>Probable Causes</h4>
          <ul>
            <li>High humidity during early growth stage</li>
            <li>Excess irrigation leading to fungal growth</li>
            <li>Limited air circulation between crops</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h4 style={styles.subHeading}>Weekly Impact Analysis</h4>
          <p><strong>Week 1:</strong> Early stress symptoms appeared</p>
          <p><strong>Week 2:</strong> Leaf spots increased gradually</p>
          <p><strong>Week 3:</strong> Rapid disease spread observed</p>
          <p><strong>Week 4:</strong> Yield reduction risk increased</p>
        </section>

        <section style={styles.section}>
          <h4 style={styles.subHeading}>Preventive Measures</h4>
          <ul>
            <li>Timely fungicide application</li>
            <li>Optimized irrigation schedule</li>
            <li>Improved crop spacing</li>
          </ul>
        </section>

        <button style={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
  },
  card: {
    backgroundColor: "#ffffff",
    width: "520px",
    maxHeight: "80vh",
    overflowY: "auto",
    padding: "36px",
    borderRadius: "18px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
  },
  heading: {
    color: "#142C52",
    textAlign: "center",
    marginBottom: "24px",
  },
  subHeading: {
    color: "#1B9AAA",
    marginBottom: "10px",
  },
  section: {
    marginBottom: "20px",
    color: "#142C52",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default EarlyAlertsCard;
