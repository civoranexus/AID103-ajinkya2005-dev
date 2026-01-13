function AnalysisTable({ analysis }) {
  if (!analysis) return null;

  return (
    <div style={styles.card}>
      <h4 style={styles.heading}>Recent Analysis Report</h4>

      <table style={styles.table}>
        <tbody>
          <tr>
            <td>Disease</td>
            <td>{analysis.disease}</td>
          </tr>
          <tr>
            <td>Severity</td>
            <td>{analysis.severity}</td>
          </tr>
          <tr>
            <td>Confidence</td>
            <td>{analysis.confidence * 100}%</td>
          </tr>
          <tr>
            <td>Recommendation</td>
            <td>{analysis.recommendation}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
  },
  heading: {
    color: "#142C52",
    marginBottom: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: "#142C52",
  },
};

export default AnalysisTable;
