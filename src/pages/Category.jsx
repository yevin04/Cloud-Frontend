import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiBase from '../apiBase';

function Category() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [categoryName]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/products`);
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }
      const data = await res.json();
      // Accept both { products: [...] } and array
      const items = Array.isArray(data) ? data : data.products || [];
      // Filter by category (case-insensitive)
      const normalize = (str) => (str || '').trim().toLowerCase();
      const filtered = items.filter(
        (p) => normalize(p.category) === normalize(categoryName)
      );
      setProducts(filtered);
    } catch (error) {
      setProducts([]);
      console.error("Product fetch error:", error);
    }
    setLoading(false);
  };

  const formatCategoryName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>{formatCategoryName(categoryName)}</h2>
      <p style={styles.subtitle}>
        Browse our collection of {categoryName.toLowerCase()}
      </p>

      {products.length === 0 ? (
        <div style={styles.empty}>
          <h3 style={styles.emptyTitle}>No products found</h3>
          <p style={styles.emptyText}>
            We don't have any {categoryName.toLowerCase()} available right now.
          </p>
          <button style={styles.shopButton} onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
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
  loading: {
    textAlign: "center",
    padding: "60px",
    color: "#666"
  },
  empty: {
    textAlign: "center",
    padding: "100px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "16px",
    marginTop: "20px"
  },
  emptyTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1d1d1f",
    marginBottom: "8px"
  },
  emptyText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "24px"
  },
  shopButton: {
    padding: "14px 32px",
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
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

export default Category;
