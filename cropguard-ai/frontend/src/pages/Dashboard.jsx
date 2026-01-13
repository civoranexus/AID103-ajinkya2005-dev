import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const summaryCards = [
    { title: "Total Analyses", value: 12 },
    { title: "High Risk Crops", value: 4 },
    { title: "Active Alerts", value: 3 },
  ];

  const severityData = [
    { name: "Low", value: 4 },
    { name: "Medium", value: 5 },
    { name: "High", value: 3 },
  ];

  const weeklyTrend = [
    { week: "Week 1", risk: 20 },
    { week: "Week 2", risk: 35 },
    { week: "Week 3", risk: 55 },
    { week: "Week 4", risk: 75 },
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Dashboard Overview</h1>

      {/* SUMMARY CARDS */}
      <div style={styles.cardRow}>
        {summaryCards.map((card, idx) => (
          <div key={idx} style={styles.summaryCard}>
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardValue}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      {mounted && (
        <div style={styles.chartsGrid}>
          {/* Severity Chart */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Disease Severity Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={severityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1B9AAA" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Trend */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Weekly Risk Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="#16808D"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  title: {
    color: "#142C52",
    marginBottom: "30px",
  },
  cardRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  cardTitle: {
    color: "#16808D",
    marginBottom: "8px",
  },
  cardValue: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#142C52",
  },
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
    gap: "30px",
  },
  chartCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
  },
  chartTitle: {
    marginBottom: "14px",
    color: "#142C52",
  },
};

export default Dashboard;
