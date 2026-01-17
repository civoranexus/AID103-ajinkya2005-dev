import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeeklyTrendChart() {
  const data = [
    { week: "Week 1", risk: 20 },
    { week: "Week 2", risk: 40 },
    { week: "Week 3", risk: 65 },
    { week: "Week 4", risk: 85 },
  ];

  return (
    <div style={styles.card}>
      <h4 style={styles.heading}>Weekly Risk Trend</h4>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="risk"
            stroke="#1B9AAA"
            strokeWidth={3}
          />
        </LineChart>
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

export default WeeklyTrendChart;
