import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [recipeCart, setRecipeCart] = useState([]);
  const [ingredientCart, setIngredientCart] = useState([]);

  useEffect(() => {
    // Retrieve stored authentication state and user details from localStorage
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user");

    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }

    // Retrieve stored carts from localStorage
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
    if (isAuthenticated) {
      localStorage.setItem("recipeCart", JSON.stringify(recipeCart));
    }
  }, [recipeCart, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("ingredientCart", JSON.stringify(ingredientCart));
    }
  }, [ingredientCart, isAuthenticated]);

  const login = (userDetails) => {
    console.log("Login function called with:", userDetails);
    setIsAuthenticated(true);
    setUser(userDetails);

    // Save authentication state and user details to localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  const logout = () => {
    console.log("Logout function called");
    setIsAuthenticated(false);
    setUser(null);

    // Remove authentication state and user details from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    // Clear carts
    setRecipeCart([]);
    setIngredientCart([]);
    localStorage.removeItem("recipeCart");
    localStorage.removeItem("ingredientCart");
  };

  const updateRecipeCart = (items) => {
    setRecipeCart(items);
  };

  const updateIngredientCart = (items) => {
    setIngredientCart(items);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        recipeCart,
        ingredientCart,
        updateRecipeCart,
        updateIngredientCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
