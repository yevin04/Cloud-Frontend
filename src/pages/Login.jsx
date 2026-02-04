import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://nikes-alb-1822383016.ap-south-1.elb.amazonaws.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // store token + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // 🔑 role-based redirect
      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Check if auth service is running.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.cardWrapper}>
        <div style={styles.card}>
          {/* Decorative accent */}
          <div style={styles.accent}></div>
          
          <div style={styles.logoSection}>
            <img 
              src="https://tse4.mm.bing.net/th/id/OIP.0hilFEDBTf_3JoP9U9jpYwHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" 
              alt="Nike Logo"
              style={styles.logoImage}
            />
            <span style={styles.logoText}>NikeS</span>
          </div>

          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>
            Sign in to access your account
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.button}>
              Sign In
            </button>
          </form>

          <p style={styles.footerText}>
            Don't have an account? <span style={styles.signupLink}>Create one</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 48px"
  },
  cardWrapper: {
    position: "relative",
    width: "50%",
    minWidth: "500px"
  },
  card: {
    position: "relative",
    width: "100%",
    padding: "56px 64px",
    borderRadius: "24px",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8) inset",
    overflow: "hidden"
  },
  accent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    borderRadius: "24px 24px 0 0"
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "32px"
  },
  logoImage: {
    width: "50px",
    height: "50px",
    objectFit: "contain",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: "8px",
    padding: "4px"
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1d1d1f",
    letterSpacing: "-0.02em"
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1d1d1f",
    marginBottom: "8px",
    letterSpacing: "-0.03em"
  },
  subtitle: {
    fontSize: "16px",
    color: "#86868b",
    marginBottom: "36px",
    fontWeight: "400"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1d1d1f"
  },
  input: {
    padding: "16px 18px",
    fontSize: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    transition: "all 0.2s ease",
    outline: "none"
  },
  button: {
    marginTop: "8px",
    padding: "16px",
    background: "linear-gradient(135deg, #1d1d1f 0%, #434343 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)"
  },
  error: {
    color: "#ff3b30",
    fontSize: "14px",
    fontWeight: "500",
    padding: "12px 16px",
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    borderRadius: "8px"
  },
  footerText: {
    marginTop: "28px",
    textAlign: "center",
    fontSize: "14px",
    color: "#86868b"
  },
  signupLink: {
    color: "#667eea",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default Login;
