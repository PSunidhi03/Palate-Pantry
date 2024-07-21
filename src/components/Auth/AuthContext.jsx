import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve stored authentication state and user details from localStorage
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user");

    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
