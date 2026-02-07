import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function SeverityChart({ severity }) {
  const data = [
    { name: "Low", value: severity === "Low" ? 1 : 0 },
    { name: "Medium", value: severity === "Medium" ? 1 : 0 },
    { name: "High", value: severity === "High" ? 1 : 0 },
  ];

  const COLORS = ["#22C55E", "#F59E0B", "#DC2626"];

  return (
    <div style={styles.card}>
      <h4 style={styles.heading}>Severity Distribution</h4>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
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
    marginBottom: "12px",
  },
};

export default SeverityChart;
