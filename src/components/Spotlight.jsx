import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Spotlight() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    import apiBase from '../apiBase';
    fetch(`${apiBase}/products`)
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.products || [];
        setProducts(items.filter((p) => p.spotlight));
      })
      .catch(() => setProducts([]));
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Spotlight</h2>
      <p style={styles.subtitle}>
        Classic silhouettes and cutting-edge innovation.
      </p>

      {products.length === 0 ? (
        <p style={styles.empty}>No spotlight products available</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <div
              key={product._id}
              style={styles.card}
              onClick={() => navigate(`/product/${product._id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.04)";
              }}
            >
              <img
                src={product.images?.[0] || "https://via.placeholder.com/400"}
                alt={product.name}
                style={styles.image}
              />

              <h4 style={styles.name}>{product.name}</h4>
              <p style={styles.category}>{product.category}</p>
              <strong style={styles.price}>${product.price}</strong>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    paddingTop: "20px"
  },
  title: {
    fontSize: "48px",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    color: "#1d1d1f",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "18px",
    color: "#333",
    fontWeight: "400",
    marginBottom: "48px"
  },
  empty: {
    color: "#86868b",
    marginTop: "60px",
    fontSize: "16px",
    textAlign: "center"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginTop: "32px",
    maxWidth: "100%"
  },
  card: {
    background: "#fff",
    padding: "24px",
    borderRadius: "18px",
    cursor: "pointer",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
    transition: "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.3s ease",
    border: "1px solid rgba(0, 0, 0, 0.04)"
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "20px",
    backgroundColor: "#f5f5f7"
  },
  name: {
    fontSize: "17px",
    fontWeight: "600",
    color: "#1d1d1f",
    marginBottom: "4px",
    letterSpacing: "-0.01em"
  },
  category: {
    fontSize: "14px",
    color: "#86868b",
    fontWeight: "400",
    marginBottom: "8px"
  },
  price: {
    display: "block",
    marginTop: "8px",
    fontSize: "17px",
    fontWeight: "600",
    color: "#1d1d1f"
  }
};

export default Spotlight;
