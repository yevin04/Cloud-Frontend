import { Link, useNavigate, useLocation } from "react-router-dom";

function Header() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;
  const isAdmin = isLoggedIn && role === "ADMIN";
  
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";
  const showShopNav = !isAdminPage && !isLoginPage;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Optionally clear other user-specific data here
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h2 style={styles.logo}>NikeS</h2>

        <nav style={styles.nav}>
          {showShopNav && (
            <>
              <Link to="/category/shoes" style={styles.link}>Shoes</Link>
              <Link to="/category/tees" style={styles.link}>Tees</Link>
              <Link to="/category/bags" style={styles.link}>Bags</Link>
              <Link to="/category/pants" style={styles.link}>Pants</Link>
              <Link to="/category/other" style={styles.link}>Other</Link>
              <Link to="/cart" style={styles.link}>Cart</Link>
            </>
          )}

          {!isLoggedIn && !isLoginPage && (
            <Link to="/login" style={styles.link}>
              Sign In
            </Link>
          )}

          {isAdmin && !isAdminPage && (
            <Link to="/admin" style={styles.admin}>
              Admin
            </Link>
          )}

          {isLoggedIn && (
            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    padding: "0 48px",
    backgroundColor: "rgba(251, 251, 253, 0.8)",
    backdropFilter: "saturate(180%) blur(20px)",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "56px"
  },
  logo: {
    fontWeight: "700",
    fontSize: "22px",
    letterSpacing: "-0.02em",
    color: "#1d1d1f"
  },
  nav: {
    display: "flex",
    gap: "32px",
    alignItems: "center"
  },
  link: {
    textDecoration: "none",
    color: "#1d1d1f",
    fontSize: "14px",
    fontWeight: "500",
    transition: "color 0.2s ease",
    opacity: "0.8"
  },
  admin: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "500",
    fontSize: "13px",
    backgroundColor: "#1d1d1f",
    padding: "8px 16px",
    borderRadius: "980px",
    transition: "all 0.2s ease"
  },
  logout: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#86868b",
    padding: "8px 0",
    transition: "color 0.2s ease"
  }
};

export default Header;
