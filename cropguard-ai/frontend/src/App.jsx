function App() {
  return (
    <div>
      {/* Top Navigation Bar */}
      <header style={styles.header}>
        <h2 style={styles.logo}>CropGuard AI</h2>

        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>Home</li>
            <li style={styles.navItem}>Upload Image</li>
            <li style={styles.navItem}>Alerts</li>
            <li style={styles.navItem}>Dashboard</li>
            <li style={styles.navItem}>About</li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <h3>Welcome to CropGuard AI</h3>
        <p>
          An AI-powered crop disease detection and advisory system designed to
          support farmers with early insights and preventive actions.
        </p>
      </main>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#0b5ed7",
    color: "#ffffff",
  },
  logo: {
    margin: 0,
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  navItem: {
    cursor: "pointer",
    fontWeight: "500",
  },
  main: {
    padding: "24px",
  },
};

export default App;
