import React from 'react';
import { useCart } from '../Auth/CartContext';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom'; // or useHistory if using older version

const CartWithRecipe = () => {
  const { ingredientCart, recipeCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleProceedToPantry = () => {
    if (!isAuthenticated) {
      alert("Please log in to proceed!");
      // Optionally redirect to login page
      navigate('/login');
    } else {
      navigate('/pantry');
    }
  };

  return (
    <div className="cart-with-recipe-container">
      <h2>Your Cart</h2>
      <div className="cart-content">
        <div className="recipe-cart">
          <h3>Recipes</h3>
          <ul>
            {recipeCart.map((recipe, index) => (
              <li key={index}>
                {recipe.name} - {recipe.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="ingredient-cart">
          <h3>Ingredients</h3>
          <ul>
            {ingredientCart.map((item, index) => (
              <li key={index}>
                {item.Item} - ₹{item.Price}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={handleProceedToPantry}>View Pantry</button>
    </div>
  );
};

export default CartWithRecipe;

