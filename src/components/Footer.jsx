function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© 2026 NikeS. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "auto",
    padding: "32px 48px",
    borderTop: "1px solid rgba(0, 0, 0, 0.08)",
    backgroundColor: "#f5f5f7"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto"
  },
  text: {
    textAlign: "center",
    fontSize: "13px",
    color: "#86868b",
    fontWeight: "400"
  }
};

export default Footer;
