import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/pantry.css";
import Header from "../Utility/Header";
import { useAuth } from "../Auth/AuthContext";

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { ingredientCart, updateIngredientCart } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cuisines-bucket.s3.ap-south-1.amazonaws.com/csvjson.json",
        );
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.Item.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.Category === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, items]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCart = (item) => {
    addToIngredientCart(item);
  };

  const categories = [...new Set(items.map((item) => item.Category)), "All"];

  return (
    <>
      <Header />
      <div className="pantry-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-container">
          <select
            className="category-filter"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="pantry-content">
          <div className="items-list">
            {filteredItems.map((item, index) => (
              <div key={index} className="item-card">
                <img
                  className="item-image"
                  src={item.image_url}
                  alt={item.Item}
                />
                <div className="item-details">
                  <div className="item-title">{item.Item}</div>
                  <div className="item-quantity">{item.quantity}</div>
                  <div className="item-price">₹{item.Price}</div>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-section">
            <h4>Your Cart</h4>
            <ul>
              {ingredientCart.map((item, index) => (
                <li key={index}>
                  {item.Item} - ₹{item.Price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pantry;
