import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import UpdateProduct from "./UpdateProduct";
const Product = () => {
  const { id } = useParams();
  const { data, addToCart, removeFromCart, cart, refreshData } =
    useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);
        if (response.data.imagename) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
   
  

    const fetchImage = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/${id}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(response.data));
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      removeFromCart(id);
      console.log("Product deleted successfully");
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handlAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };
  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }
  return (
    <>
      <div className="containers" style={{ display: "flex" }}>
        <img
          className="left-column-img"
          src={imageUrl}
          alt={product.imagename}
          style={{
            width: "100%", 
            height: "auto", 
            borderRadius: "20px"
          }}
        />

        <div className="right-column" style={{ width: "50%" }}>
          <div className="product-description">
            <div style={{display:'flex',justifyContent:'space-between' }}>
            <span style={{ fontSize: "1.2rem", fontWeight: 'bolder' }}>
              {product.category}
            </span>
            <p className="release-date" style={{ marginBottom: "2rem" }}>
              
              <h6>Listed : <span> <i> {new Date(product.releasedate).toLocaleDateString()}</i></span></h6>
              {/* <i> {new Date(product.releaseDate).toLocaleDateString()}</i> */}
            </p>
            </div>
            
           
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem",textTransform: 'capitalize', letterSpacing:'1px' }}>
              {product.name}
            </h1>
            <i style={{ marginBottom: "3rem" }}>{product.brand}</i>
            <p style={{fontWeight:'bold',fontSize:'1rem',margin:'10px 0px 0px'}}>PRODUCT DESCRIPTION :</p>
            <p style={{ marginBottom: "1rem" }}>{product.description}</p>
          </div>

          <div className="product-price">
  <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
    {"₹" + product.price}
  </span>

  <button
    className={`cart-btn ${!product.productavailable ? "disabled-btn" : ""}`}
    onClick={handlAddToCart}
    disabled={!product.productavailable}
    style={{
      padding: "1rem 2rem",
      fontSize: "1rem",
      background: product.productavailable
        ? "linear-gradient(45deg, #007bff, #00c6ff)" // Gradient for available product
        : "#dcdcdc", // Light grey for out of stock
      color: product.productavailable ? "white" : "#777", // Text color based on availability
      border: "none",
      borderRadius: "5px",
      cursor: product.productavailable ? "pointer" : "not-allowed", // Disable cursor for out of stock
      marginBottom: "1rem",
      transition: "background 0.3s ease, transform 0.3s ease", // Smooth transition
    }}
    onMouseEnter={(e) => {
      if (product.productavailable) {
        e.target.style.transform = "scale(1.05)"; // Slightly enlarge on hover when available
      }
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = "scale(1)"; // Reset to original size
    }}
  >
    {product.productavailable ? "Add to cart" : "Out of Stock"}
  </button>

  <h6 style={{ marginBottom: "1rem" }}>
    Stock Available :{" "}
    <i style={{ color: "green", fontWeight: "bold" }}>
      {product.qantity}
    </i>
  </h6>
</div>

          <div className="update-button" style={{ display: "flex", gap: "1rem" }}>
  <button
  className="btn btn-primary"
  type="button"
  onClick={handleEditClick}
  style={{
    padding: "1rem 2rem",
    fontSize: "1rem",
    background: "linear-gradient(45deg, #007bff, #00c6ff)", // Gradient color
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.3s ease", // Smooth transition
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.1)"; // Slightly enlarge on hover
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)"; // Reset to original size
  }}
>
  Update
</button>

{/* <UpdateProduct product={product} onUpdate={handleUpdate} /> */}
            <button
  className="btn btn-primary"
  type="button"
  onClick={deleteProduct}
  style={{
    padding: "1rem 2rem",
    fontSize: "1rem",
    background: "linear-gradient(45deg, #dc3545, #ff6f61)", // Gradient color
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.3s ease", // Smooth transition
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.1)"; // Slightly enlarge on hover
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)"; // Reset to original size
  }}
>
  Delete
</button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Product;