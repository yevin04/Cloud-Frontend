import { useState } from "react";

function InventoryForm({ productId, onSaved }) {
  const [variant, setVariant] = useState("");
  const [stock, setStock] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    import apiBase from '../apiBase';
    await fetch(`${apiBase}/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId,
        variant,
        stock: Number(stock)
      })
    });

    setVariant("");
    setStock("");
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        placeholder="Variant (e.g. Red / Size 9)"
        value={variant}
        onChange={(e) => setVariant(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />

      <button type="submit">Add / Update Stock</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "8px",
    marginTop: "8px"
  }
};

export default InventoryForm;
