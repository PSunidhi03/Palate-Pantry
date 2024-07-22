import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/pantry.css";
import Header from "../Utility/Header";
import { useAuth } from "../Auth/AuthContext";

const Pantry = () => {
  const [ingredientsData, setIngredientsData] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const {user, recipeCart, ingredientCart, updateRecipeCart, updateIngredientCart } =
  useAuth();
  const [ingredientQuantities, setIngredientQuantities] = useState(
    ingredientCart.reduce((acc, ingredientName) => {
      acc[ingredientName] = 1; // Initial quantity
      return acc;
    }, {}),
  );

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          "https://cuisines-bucket.s3.ap-south-1.amazonaws.com/csvjson.json",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();

        setIngredientsData(jsonData);
      } catch (err) {
        console.error("Failed to fetch ingredients:", err.message);
      }
    };

    fetchIngredients();
  }, []);

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

    const calculateIngredientSubtotal = () => {
    return ingredientCart.reduce((total, ingredientName) => {
      const ingredient = ingredientsData.find(
        (item) =>
          item.Item &&
          ingredientName &&
          item.Item.toLowerCase().includes(ingredientName.toLowerCase()),
      );
      return ingredient
        ? total + ingredient.Price * (ingredientQuantities[ingredientName] || 1)
        : total;
    }, 0);
  };

    const incrementQuantity = (item) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );
      updateRecipeCart(updatedCart);
      return updatedCart;
    });
  };

  const decrementQuantity = (item) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems
        .map((cartItem) =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 0,
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0); // Remove items with quantity 0
      updateRecipeCart(updatedCart);
      return updatedCart;
    });
  };

  const incrementIQuantity = (ingredientName) => {
    setIngredientQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ingredientName]: (prevQuantities[ingredientName] || 0) + 1,
    }));
  };

  const decrementIQuantity = (ingredientName) => {
    setIngredientQuantities((prevQuantities) => {
      const newQuantity = Math.max(
        (prevQuantities[ingredientName] || 1) - 1,
        0,
      );

      // Remove ingredient from the cart if quantity is 0
      if (newQuantity === 0) {
        updateIngredientCart((prevCart) => {
          return prevCart.filter((item) => item !== ingredientName);
        });
      }

      // Ensure that the quantity in the state is updated properly
      return {
        ...prevQuantities,
        [ingredientName]: newQuantity,
      };
    });
  };

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
          <div className="ingredient-cart">
            <h4>Ingredients Cart</h4>
            {ingredientCart.length === 0 ? (
              <p>No ingredients in cart.</p>
            ) : (
              <ul>
                {ingredientCart.map((ingredientName, index) => {
                  if (!ingredientName) return null; // Skip undefined or empty ingredient names

                  const ingredient = ingredientsData.find(
                    (item) =>
                      item.Item &&
                      ingredientName &&
                      item.Item.toLowerCase().includes(
                        ingredientName.toLowerCase(),
                      ),
                  );

                  return (
                    ingredient && (
                      <li key={index}>
                        <img
                          src={ingredient.image_url}
                          alt={ingredient.Item}
                          style={{ width: "50px", height: "50px" }}
                        />
                        {ingredient.Item}: {ingredient.Price} (
                        {ingredientQuantities[ingredientName] || 1})
                        <button
                          onClick={() => decrementIQuantity(ingredientName)}
                        >
                          -
                        </button>
                        <button
                          onClick={() => incrementIQuantity(ingredientName)}
                        >
                          +
                        </button>
                      </li>
                    )
                  );
                })}
              </ul>
            )}
            <div className="cart-total">
              <p>Subtotal: Rs {calculateIngredientSubtotal().toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pantry;
