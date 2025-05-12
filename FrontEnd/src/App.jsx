import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import Login from "./components/Login";
import Signup from "./components/signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/" /> : <Signup />
            }
          />
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <Navbar onSelectCategory={handleCategorySelect} setIsAuthenticated={setIsAuthenticated} />
                  <Home addToCart={addToCart} selectedCategory={selectedCategory} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add_product"
            element={
              isAuthenticated ? (
                <>
                  <Navbar onSelectCategory={handleCategorySelect} setIsAuthenticated={setIsAuthenticated} />
                  <AddProduct />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/product"
            element={
              isAuthenticated ? (
                <>
                  <Navbar setIsAuthenticated={setIsAuthenticated} />
                  <Product />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/product/:id"
            element={
              isAuthenticated ? (
                <>
                  <Navbar setIsAuthenticated={setIsAuthenticated} />
                  <Product />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/cart"
            element={
              isAuthenticated ? (
                <>
                  <Navbar setIsAuthenticated={setIsAuthenticated} />
                  <Cart cart={cart} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/product/update/:id"
            element={
              isAuthenticated ? (
                <>
                  <Navbar setIsAuthenticated={setIsAuthenticated} />
                  <UpdateProduct />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
