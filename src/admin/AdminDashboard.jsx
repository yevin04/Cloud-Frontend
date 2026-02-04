import { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import InventoryTable from "./InventoryTable";

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://nikes-alb-1822383016.ap-south-1.elb.amazonaws.com/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p style={styles.subtitle}>Manage products, spotlight items, and inventory</p>
      </div>

      <ProductTable onProductChange={fetchProducts} />
      
      <InventoryTable products={products} />
    </div>
  );
}

const styles = {
  page: {
    padding: "20px 0"
  },
  header: {
    marginBottom: "32px"
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1d1d1f",
    letterSpacing: "-0.02em",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "16px",
    color: "#86868b",
    fontWeight: "400"
  }
};

export default AdminDashboard;
