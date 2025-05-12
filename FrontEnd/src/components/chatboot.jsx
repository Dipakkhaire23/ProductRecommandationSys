import React, { useState } from "react";
import Fuse from "fuse.js"; // For fuzzy searching

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! Ask me about any product." }]);
  const [userInput, setUserInput] = useState("");
  const [typing, setTyping] = useState(false);

  const productInfo = {
    "which iphone is better": "iPhone 13, iPhone 16, iPhone 15. iPhone 13 offers a balanced performance with an A15 Bionic chip and dual-camera system. iPhone 15 includes Dynamic Island, an A16 Bionic chip, and USB-C charging. iPhone 16 (upcoming) is expected to feature enhanced AI, a better camera system, and improved battery life.",
    "macbook air": "MacBook Air features Apple's M1 or M2 chip for lightning-fast performance and all-day battery life. It has a Retina display with True Tone technology, lightweight portability, and an efficient cooling system, making it perfect for students and professionals.",
    "sony headphones": "Sony's noise-canceling headphones offer superior sound quality and long battery life. Popular models like WH-1000XM5 and WH-1000XM4 provide industry-leading noise cancellation, Hi-Res audio, up to 30 hours of battery life, and Bluetooth connectivity for a wireless experience.",
    "t shirt": "A T-shirt is a casual top made from soft fabric, available in various colors, designs, and fits for everyday wear. Made from cotton, polyester, or blended fabric, T-shirts come in crew neck, V-neck, polo, and oversized styles, suitable for casual wear and layering.",
    "jeans": "Jeans are versatile, durable pants made from denim, available in different styles like skinny, straight, and bootcut. They come in various washes and stretch options for comfort, with top brands like Levi's, Wrangler, and Lee offering stylish and long-lasting designs.",
    "electronics": "Electronics include gadgets and devices like smartphones, laptops, TVs, and home appliances for everyday convenience. Popular brands such as Apple, Samsung, Sony, and LG offer advanced technology, including AI-driven smart devices, 5G connectivity, and high-performance computing.",
    "formal": "Formal wear includes suits, dress shirts, blazers, and elegant dresses, perfect for business or special events. Men’s formal wear consists of tailored suits, ties, and polished shoes, while women’s options include elegant dresses, skirts, and formal blouses for professional and evening occasions.",
    "watches": "Watches are accessories that combine function and fashion, available in analog, digital, and smart styles. Luxury brands like Rolex and Omega offer high-end mechanical watches, while Apple Watch and Samsung Galaxy Watch provide smart features like health tracking, notifications, and fitness monitoring.",
    "phones": "Phones, especially smartphones, offer essential communication and features like high-quality cameras and internet access. Leading brands such as Apple, Samsung, and Google provide cutting-edge technology, including powerful processors, 5G support, and AI-powered photography.",
    "foods": "Food products range from fresh produce and snacks to gourmet meals and beverages, catering to all tastes. Healthy options like organic, gluten-free, and vegan foods are available, along with popular brands such as Nestlé, Kellogg’s, and PepsiCo offering a variety of packaged and fresh food products.",
    "cosmetic": "Cosmetics include makeup and beauty products like foundation, lipstick, mascara, and skincare for enhancing beauty. Major brands like MAC, Maybelline, L'Oréal, and Estée Lauder offer high-quality products, including moisturizers, serums, sunscreens, and anti-aging solutions."
  };

  // Initialize Fuse.js for fuzzy searching
  const fuse = new Fuse(Object.keys(productInfo), { threshold: 0.3 });

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages([...messages, userMessage]);
    setUserInput("");
    setTyping(true);

    // Perform fuzzy search
    const result = fuse.search(userInput.toLowerCase());
    const response = result.length
      ? productInfo[result[0].item]
      : "Sorry, I don't have information on that product yet.";

    // Simulate typing delay
    setTimeout(() => {
      const botMessage = { sender: "bot", text: response };
      setMessages((prev) => [...prev, botMessage]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
      {chatOpen ? (
        <div
          style={{
            width: "300px",
            height: "400px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              padding: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Chatbot
            <button
              onClick={() => setChatOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "16px",
                float: "right",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
                  backgroundColor: msg.sender === "bot" ? "#e1e1e1" : "#007BFF",
                  color: msg.sender === "bot" ? "black" : "white",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  margin: "5px 0",
                  maxWidth: "80%",
                  wordWrap: "break-word",
                }}
              >
                {msg.text}
              </div>
            ))}
            {typing && (
              <div
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#e1e1e1",
                  color: "black",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  margin: "5px 0",
                  maxWidth: "80%",
                  fontStyle: "italic",
                }}
              >
                Searching...
              </div>
            )}
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask me about a product..."
              style={{
                flex: 1,
                border: "none",
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "0 0 0 10px",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "0 0 10px 0",
                fontWeight: "bold",
              }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setChatOpen(true)}
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "15px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
