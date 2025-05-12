import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";
import Chatbot from "./chatboot";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [chatbotMessage, setChatbotMessage] = useState("");

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error("Error fetching image for product ID:", product.id, error);
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );

        updatedProducts.sort((a, b) => a.id - b.id);
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const handleRecommend = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRecommendedProducts(filtered);
    setChatbotMessage(filtered.length > 0 ? "Here are some products recommended for you." : "No products found.");
  };

  const displayedProducts = searchTerm
    ? recommendedProducts
    : products.slice(0, 6); // Show only the first 6 products when there's no search term

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img src={unplugged} alt="Error" style={{ width: "100px", height: "100px" }} />
      </h2>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Recommended for You</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search product as per your interest"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleRecommend}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Recommend Me
        </button>
      </div>
      {chatbotMessage && (
        <div style={{ textAlign: "center", marginBottom: "20px", fontSize: "1.2rem", color: "#28a745" }}>
          {chatbotMessage}
        </div>
      )}
      <div
        className="grid"
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {displayedProducts.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
           Recommending You........
          </h2>
        ) : (
          displayedProducts.map((product) => {
            const { id, brand, name, price, productavailable, imageUrl } = product;

            return (
              <div
                className="card mb-3"
                key={id}
                style={{
                  width: "250px",
                  height: "360px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: productavailable ? "#fff" : "#ccc",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img
                    src={imageUrl}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      padding: "5px",
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                  <div
                    className="card-body"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <h5 className="card-title" style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>
                        {name.toUpperCase()}
                      </h5>
                      <i className="card-brand" style={{ fontWeight: "bold", fontSize: "1rem" }}>
                        {brand}
                      </i>
                    </div>
                    <hr className="hr-line" style={{ margin: "10px 0" }} />
                    <div className="home-cart-price">
                      <h5
                        className="card-text"
                        style={{ fontWeight: "600", fontSize: "1.1rem", marginBottom: "5px" }}
                      >
                        ₹{price}
                      </h5>
                    </div>
                    <button
                      className="btn-hover color-9"
                      style={{ margin: "10px 25px 0" }}
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      disabled={!productavailable}
                    >
                      {productavailable ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
      <Chatbot products={products} chatbotMessage={chatbotMessage} />
    </>
  );
};

export default Home;
