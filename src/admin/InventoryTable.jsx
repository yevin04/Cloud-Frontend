import { useEffect, useState } from "react";

function InventoryTable({ products }) {
  const [inventory, setInventory] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form fields
  const [formProductId, setFormProductId] = useState("");
  const [variant, setVariant] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (selectedProductId) {
      fetchInventory(selectedProductId);
    } else {
      setInventory([]);
    }
  }, [selectedProductId]);

  const fetchInventory = async (productId) => {
    try {
      const res = await fetch(`http://localhost:4003/api/inventory/${productId}`);
      const data = await res.json();
      setInventory(Array.isArray(data) ? data : []);
    } catch (err) {
      setInventory([]);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    await fetch("http://localhost:4003/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: formProductId,
        variant,
        stock: Number(stock)
      })
    });

    resetForm();
    if (selectedProductId === formProductId) {
      fetchInventory(selectedProductId);
    } else {
      setSelectedProductId(formProductId);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    await fetch(`http://localhost:4003/api/inventory/${editingItem._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stock: Number(stock)
      })
    });

    resetForm();
    fetchInventory(selectedProductId);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setStock(item.stock);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormProductId("");
    setVariant("");
    setStock("");
  };

  const getProductName = (productId) => {
    const product = products.find(p => p._id === productId);
    return product ? product.name : "Unknown";
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Inventory</h2>
        {!showForm && (
          <button 
            style={styles.addButton} 
            onClick={() => { setEditingItem(null); setShowForm(true); }}
          >
            + Add Stock
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>
            {editingItem ? `Update Stock: ${editingItem.variant}` : "Add Inventory"}
          </h3>
          <form onSubmit={editingItem ? handleUpdate : handleCreate} style={styles.form}>
            {!editingItem && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Product</label>
                  <select
                    value={formProductId}
                    onChange={(e) => setFormProductId(e.target.value)}
                    style={styles.input}
                    required
                  >
                    <option value="">Select product</option>
                    {products.map((p) => (
                      <option key={p._id} value={p._id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Variant</label>
                  <input
                    placeholder="e.g. US 9, Medium, Red"
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
              </>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Stock</label>
              <input
                type="number"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                style={styles.input}
                min="0"
                required
              />
            </div>

            <div style={styles.actions}>
              <button type="submit" style={styles.submitBtn}>
                {editingItem ? "Update" : "Add"}
              </button>
              <button type="button" onClick={resetForm} style={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product Filter */}
      <div style={styles.filterRow}>
        <label style={styles.filterLabel}>View inventory for:</label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Inventory Table */}
      {selectedProductId && (
        <div style={styles.tableWrapper}>
          {inventory.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No inventory records for this product.</p>
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Variant</th>
                  <th style={styles.th}>Stock</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item._id} style={styles.tr}>
                    <td style={styles.td}>{getProductName(item.productId)}</td>
                    <td style={styles.td}>{item.variant}</td>
                    <td style={styles.td}>
                      <span style={item.stock > 0 ? styles.stockBadge : styles.stockBadgeEmpty}>
                        {item.stock} units
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.editBtn} onClick={() => handleEdit(item)}>
                        Update Stock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {!selectedProductId && (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>Select a product above to view its inventory.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: "48px"
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
    background: "linear-gradient(135deg, #34c759 0%, #30d158 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 14px rgba(52, 199, 89, 0.4)"
  },
  formCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
    border: "1px solid rgba(0,0,0,0.06)"
  },
  formTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1d1d1f",
    marginBottom: "16px"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    alignItems: "end"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    minWidth: "180px",
    flex: "1"
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
  actions: {
    display: "flex",
    gap: "8px",
    alignItems: "center"
  },
  submitBtn: {
    padding: "10px 20px",
    background: "linear-gradient(135deg, #34c759 0%, #30d158 100%)",
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
  },
  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px"
  },
  filterLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1d1d1f"
  },
  filterSelect: {
    padding: "10px 16px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    outline: "none",
    minWidth: "200px"
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
  stockBadge: {
    display: "inline-block",
    padding: "6px 14px",
    backgroundColor: "rgba(52, 199, 89, 0.15)",
    color: "#34c759",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600"
  },
  stockBadgeEmpty: {
    display: "inline-block",
    padding: "6px 14px",
    backgroundColor: "rgba(255, 59, 48, 0.15)",
    color: "#ff3b30",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600"
  },
  editBtn: {
    padding: "10px 20px",
    background: "#f5f5f7",
    color: "#1d1d1f",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease"
  },
  emptyState: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px",
    textAlign: "center",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)"
  },
  emptyText: {
    fontSize: "15px",
    color: "#86868b"
  }
};

export default InventoryTable;
