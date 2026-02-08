import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiBase from '../apiBase';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [variant, setVariant] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchProduct();
    fetchInventory();
  }, []);

  const fetchProduct = async () => {
    
    const res = await fetch(`${apiBase}/products/${id}`);
    const data = await res.json();
    setProduct(data);
  };

  const fetchInventory = async () => {
    const res = await fetch(
      `${apiBase}/inventory/${id}`
    );
    const data = await res.json();
    setInventory(data);
  };

  const selectedStock =
    inventory.find((i) => i.variant === variant)?.stock || 0;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      variant,
      quantity: qty
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart ✅");
    navigate("/cart");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={styles.card}>
      <img 
        src={product.images?.[0] || "https://via.placeholder.com/400"} 
        alt={product.name}
        style={styles.image}
      />
      <h2 style={styles.name}>{product.name}</h2>
      <p style={styles.category}>{product.category}</p>
      <h3 style={styles.price}>${product.price}</h3>

      <hr style={styles.divider} />

      <label style={styles.label}>Variant</label>
      <select
        value={variant}
        onChange={(e) => {
          setVariant(e.target.value);
          setQty(1);
        }}
        style={styles.input}
      >
        <option value="">Select a variant</option>
        {inventory.map((i) => (
          <option key={i._id} value={i.variant}>
            {i.variant} ({i.stock} left)
          </option>
        ))}
      </select>

      <label style={styles.label}>Quantity</label>
      <input
        type="number"
        min="1"
        max={selectedStock}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        style={styles.input}
      />

      <button
        onClick={addToCart}
        style={styles.button}
      >
        Add to Cart
      </button>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: "420px",
    margin: "0 auto",
    padding: "24px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "16px"
  },
  name: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "4px",
    color: "#1d1d1f"
  },
  category: {
    fontSize: "14px",
    color: "#86868b",
    marginBottom: "8px"
  },
  price: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1d1d1f",
    marginBottom: "12px"
  },
  divider: {
    border: "none",
    borderTop: "1px solid #e5e5e5",
    marginBottom: "12px"
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#1d1d1f",
    marginBottom: "4px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #d2d2d7",
    fontSize: "14px",
    backgroundColor: "#fafafa"
  },
  button: {
    width: "100%",
    padding: "12px",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "3px"
  }
};

export default ProductDetails;
