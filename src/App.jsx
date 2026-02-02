import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Spotlight from "./components/Spotlight";
import Login from "./pages/Login";
import AdminDashboard from "./admin/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Category from "./pages/Category";

// Protected route component that checks both token and role
function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = !!token && role === "ADMIN";
  return isAdmin ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main style={styles.main}>
        <div style={styles.container}>
          <Routes>
            {/* User routes */}
            <Route path="/" element={<Spotlight />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category/:categoryName" element={<Category />} />

            {/* Admin route */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
        </div>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

const styles = {
  main: {
    flex: 1,
    padding: "48px 48px",
    backgroundColor: "transparent"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto"
  }
};

export default App;
