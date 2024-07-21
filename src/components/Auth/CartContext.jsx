import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [recipeCart, setRecipeCart] = useState([]);
  const [ingredientCart, setIngredientCart] = useState([]);

  useEffect(() => {
    const storedRecipeCart = localStorage.getItem("recipeCart");
    const storedIngredientCart = localStorage.getItem("ingredientCart");

    if (storedRecipeCart) {
      setRecipeCart(JSON.parse(storedRecipeCart));
    }
    if (storedIngredientCart) {
      setIngredientCart(JSON.parse(storedIngredientCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recipeCart", JSON.stringify(recipeCart));
  }, [recipeCart]);

  useEffect(() => {
    localStorage.setItem("ingredientCart", JSON.stringify(ingredientCart));
  }, [ingredientCart]);

  const addToRecipeCart = (item) => {
    setRecipeCart((prevItems) => [...prevItems, item]);
  };

  const addToIngredientCart = (item) => {
    setIngredientCart((prevItems) => [...prevItems, item]);
  };

  return (
    <CartContext.Provider value={{ recipeCart, ingredientCart, addToRecipeCart, addToIngredientCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
