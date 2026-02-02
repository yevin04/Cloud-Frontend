import { useState, useEffect } from "react";

function ProductForm({ selectedProduct, onSave, onCancel }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [spotlight, setSpotlight] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setCategory(selectedProduct.category);
      setPrice(selectedProduct.price);
      setImageUrl(selectedProduct.images?.[0] || "");
      setSpotlight(selectedProduct.spotlight);
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      name,
      category,
      price: Number(price),
      images: imageUrl ? [imageUrl] : [],
      spotlight
    });

    // reset form
    setName("");
    setCategory("");
    setPrice("");
    setImageUrl("");
    setSpotlight(false);
  };

  return (
    <div style={styles.formCard}>
      <h3 style={styles.formTitle}>{selectedProduct ? "Edit Product" : "Add New Product"}</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select</option>
            <option value="Shoes">Shoes</option>
            <option value="Tees">Tees</option>
            <option value="Bags">Bags</option>
            <option value="Pants">Pants</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Price</label>
          <input
            type="number"
            placeholder="$0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroupWide}>
          <label style={styles.label}>Image URL</label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={styles.input}
          />
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Preview" 
              style={styles.imagePreview}
              onError={(e) => e.target.style.display = 'none'}
              onLoad={(e) => e.target.style.display = 'block'}
            />
          )}
        </div>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={spotlight}
            onChange={() => setSpotlight(!spotlight)}
            style={styles.checkbox}
          />
          <span style={styles.checkboxText}>Spotlight</span>
        </label>

        <div style={styles.actions}>
          <button type="submit" style={styles.submitBtn}>
            {selectedProduct ? "Update" : "Add"}
          </button>

          {selectedProduct && (
            <button type="button" onClick={onCancel} style={styles.cancelBtn}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const styles = {
  formCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
    border: "1px solid rgba(0,0,0,0.06)"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr auto auto",
    gap: "16px",
    alignItems: "end"
  },
  formTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1d1d1f",
    marginBottom: "16px",
    gridColumn: "1 / -1"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  inputGroupWide: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    gridColumn: "1 / -1"
  },
  imagePreview: {
    marginTop: "8px",
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid rgba(0,0,0,0.1)"
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#86868b",
    textTransform: "uppercase",
    letterSpacing: "0.03em"
  },
  input: {
    padding: "10px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fafafa",
    outline: "none",
    transition: "all 0.2s ease",
    width: "100%",
    boxSizing: "border-box"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    padding: "10px 12px",
    backgroundColor: "#fafafa",
    borderRadius: "8px",
    border: "1px solid rgba(0, 0, 0, 0.1)"
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer"
  },
  checkboxText: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#1d1d1f"
  },
  actions: {
    display: "flex",
    gap: "8px",
    alignItems: "center"
  },
  submitBtn: {
    padding: "10px 20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap"
  },
  cancelBtn: {
    padding: "10px 16px",
    background: "#f5f5f7",
    color: "#1d1d1f",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px"
  }
};

export default ProductForm;
