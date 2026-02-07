import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiBase from '../apiBase';

function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!token) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    try {
    
      const response = await fetch(`${apiBase}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to place order");
      }

      localStorage.removeItem("cart");
      setCart([]);
      alert("Order placed successfully!");
    } catch (error) {
      alert(error.message || "Failed to place order");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Cart</h2>

      {cart.length === 0 ? (
        <div style={styles.emptyCart}>
          <h3 style={styles.emptyTitle}>Your cart is empty</h3>
          <p style={styles.emptyText}>Looks like you haven't added anything yet.</p>
          <button style={styles.shopButton} onClick={() => navigate("/")}>
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          {cart.map((item, idx) => (
            <div key={idx} style={styles.row}>
              <div>
                <strong>{item.name}</strong>
                <div>{item.variant}</div>
              </div>
              <div>
                {item.quantity} × ${item.price}
              </div>
            </div>
          ))}

          <hr />
          <h3>Total: ${total}</h3>

          <button style={styles.button} onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto"
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "24px",
    color: "#1d1d1f"
  },
  emptyCart: {
    textAlign: "center",
    padding: "150px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "16px",
    marginTop: "20px"
  },
  sadFace: {
    fontSize: "80px",
    marginBottom: "20px"
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
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #eee"
  },
  button: {
    marginTop: "20px",
    padding: "14px",
    width: "100%",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer"
  }
};

export default Cart;
