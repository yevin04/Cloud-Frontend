import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

function ProductTable({ onProductChange }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    import apiBase from '../apiBase';
    const res = await fetch(`${apiBase}/products`);
    const data = await res.json();
    const items = Array.isArray(data) ? data : data.products || [];
    setProducts(items);
    if (onProductChange) onProductChange();
  };

  const handleSave = async (productData) => {
    if (selectedProduct) {
      // Update
      await fetch(`${apiBase}/products/${selectedProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      });
    } else {
      // Create
      await fetch(`${apiBase}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      });
    }

    setSelectedProduct(null);
    setShowForm(false);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    await fetch(`${apiBase}/products/${id}`, {
      method: "DELETE"
    });
    fetchProducts();
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Products</h2>
        {!showForm && (
          <button 
            style={styles.addButton} 
            onClick={() => { setSelectedProduct(null); setShowForm(true); }}
          >
            + Add Product
          </button>
        )}
      </div>

      {showForm && (
        <ProductForm 
          selectedProduct={selectedProduct} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      )}

      {products.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No products yet. Add your first product to get started!</p>
        </div>
      ) : (
        <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Spotlight</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} style={styles.tr}>
                <td style={styles.td}>
                  <img 
                    src={product.images?.[0] || "https://via.placeholder.com/60"} 
                    alt={product.name}
                    style={styles.thumbnail}
                  />
                </td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>{product.category}</td>
                <td style={styles.td}>${product.price}</td>
                <td style={styles.td}>
                  <span style={product.spotlight ? styles.badgeActive : styles.badge}>
                    {product.spotlight ? "Yes" : "No"}
                  </span>
                </td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: "24px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1d1d1f"
  },
  addButton: {
    padding: "14px 28px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 14px rgba(102, 126, 234, 0.4)"
  },
  emptyState: {
    background: "#fff",
    borderRadius: "16px",
    padding: "60px 40px",
    textAlign: "center",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)"
  },
  emptyText: {
    fontSize: "16px",
    color: "#86868b"
  },
  tableWrapper: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
    overflow: "hidden"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    textAlign: "left",
    padding: "18px 24px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#86868b",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    backgroundColor: "#fafafa"
  },
  tr: {
    borderBottom: "1px solid rgba(0,0,0,0.05)",
    transition: "background-color 0.2s ease"
  },
  td: {
    padding: "20px 24px",
    fontSize: "15px",
    color: "#1d1d1f",
    fontWeight: "500"
  },
  thumbnail: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "8px"
  },
  badgeActive: {
    display: "inline-block",
    padding: "6px 14px",
    backgroundColor: "rgba(52, 199, 89, 0.15)",
    color: "#34c759",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600"
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    backgroundColor: "rgba(0,0,0,0.05)",
    color: "#86868b",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500"
  },
  editBtn: {
    padding: "10px 20px",
    background: "#f5f5f7",
    color: "#1d1d1f",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    marginRight: "10px",
    fontSize: "14px",
    transition: "all 0.2s ease"
  },
  deleteBtn: {
    padding: "10px 20px",
    background: "rgba(255, 59, 48, 0.1)",
    color: "#ff3b30",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease"
  }
};

export default ProductTable;
