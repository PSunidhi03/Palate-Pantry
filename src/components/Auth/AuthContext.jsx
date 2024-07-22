import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [recipeCart, setRecipeCart] = useState([]);
  const [ingredientCart, setIngredientCart] = useState([]);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user");

    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }

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
    setIsAuthenticated(true);
    setUser(userDetails);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
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

  const updateUserBudget = (budget) => {
    setUser((prevUser) => ({
      ...prevUser,
      currentBudget: budget,
    }));
    localStorage.setItem("user", JSON.stringify({
      ...user,
      currentBudget: budget,
    }));
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
        updateUserBudget,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
