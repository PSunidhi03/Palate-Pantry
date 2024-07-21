import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  Card,
  Button,
  Badge,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Card.css";
import { useAuth } from "../Auth/AuthContext";
import { useFetchCsvData } from "../CsvData/CsvDataContex";
import { useNavigate, Link } from "react-router-dom";

const CardComponent = () => {
  const { cuisinesData, pantryIngredientsData } = useFetchCsvData();
  const [data, setData] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { recipeCart, ingredientCart, updateRecipeCart, updateIngredientCart } =
    useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [allIngredients, setAllIngredients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Sync cartItems with recipeCart from AuthContext
    setCartItems(recipeCart);
  }, [recipeCart]);

  useEffect(() => {
    updateIngredientCart(allIngredients);
  }, [allIngredients]);

  useEffect(() => {
    const processIngredients = (ingredientString) => {
      const cleanedString = ingredientString.replace(/\t/g, "").trim();
      return cleanedString
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item);
    };

    const ingredientSet = new Set();
    cartItems.forEach((item) => {
      const ingredients = processIngredients(item["raw ingredients"]);
      ingredients.forEach((ingredient) => ingredientSet.add(ingredient));
    });

    const uniqueIngredients = Array.from(ingredientSet);
    setAllIngredients(uniqueIngredients);
  }, [cartItems]);

  useEffect(() => {
    if (allIngredients.length > 0) {
      updateIngredientCart(allIngredients); // Update the context variable with the new ingredients
    }
  }, [allIngredients, updateIngredientCart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cuisines-bucket.s3.ap-south-1.amazonaws.com/cuisines-final.csv",
        );
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const results = Papa.parse(csv, { header: true });
        setData(results.data);
        setFilteredData(results.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const addToCart = (item) => {
    const dishIngredients = ingredientsData.filter(
      (ingredient) => ingredient.dish === item.name,
    );

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.name === item.name,
      );
      let updatedCart;
      if (existingItem) {
        updatedCart = prevItems.map((cartItem) =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                ingredients: dishIngredients,
              }
            : cartItem,
        );
      } else {
        updatedCart = [
          ...prevItems,
          { ...item, quantity: 1, ingredients: dishIngredients },
        ];
      }
      updateRecipeCart(updatedCart);
      return updatedCart;
    });
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
const [ingredientQuantities, setIngredientQuantities] = useState(
  ingredientCart.reduce((acc, ingredientName) => {
    acc[ingredientName] = 1; // Initial quantity
    return acc;
  }, {})
);

const incrementIQuantity = (ingredientName) => {
  setIngredientQuantities((prevQuantities) => ({
    ...prevQuantities,
    [ingredientName]: (prevQuantities[ingredientName] || 0) + 1,
  }));
};

const decrementIQuantity = (ingredientName) => {
  setIngredientQuantities((prevQuantities) => {
    const newQuantity = Math.max((prevQuantities[ingredientName] || 1) - 1, 0);

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
  // const calculateSubtotal = () => {
  //   return cartItems
  //     .reduce((acc, item) => acc + item.price * item.quantity, 0)
  //     .toFixed(2);
  // };
const calculateIngredientSubtotal = () => {
  return ingredientCart.reduce((total, ingredientName) => {
    const ingredient = ingredientsData.find(
      (item) =>
        item.Item &&
        ingredientName &&
        item.Item.toLowerCase().includes(ingredientName.toLowerCase())
    );
    return ingredient
      ? total + (ingredient.Price * (ingredientQuantities[ingredientName] || 1))
      : total;
  }, 0);
};
  const handleReadMoreToggle = (index) => {
    const newFilteredData = filteredData.map((item, i) => {
      if (i === index) {
        return { ...item, showMore: !item.showMore };
      }
      return item;
    });
    setFilteredData(newFilteredData);
  };

  const handleViewRecipe = (item, type) => {
    setModalContent({ ...item, type });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log("Current IngredientCart:", ingredientCart); // Log the current allIngredients
  console.log("Current allIngredients:", allIngredients); // Log the current allIngredients
  console.log("Current Pantry ingredients: ", ingredientsData);


  return (
    <Container fluid>
      <Row className="mb-4">
        {/* Existing column for cartItems */}
        <Col md={6}>
          <div className="cart">
            <h4>Cart</h4>
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <span className="cart-item-name">{item.name}</span>
                <div className="cart-item-controls">
                  <button onClick={() => decrementQuantity(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item)}>+</button>
                </div>
                <ul className="cart-item-ingredients">
                  {item.ingredients.map((ingredient, i) => (
                    <li key={i}>
                      {ingredient.name}: {ingredient.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="cart-total">
              {/* <p>Subtotal: ${calculateSubtotal()}</p> */}
              <Button className="proceed-to-checkout">Buy</Button>
            </div>
          </div>
          <Link to="/recipe">
            <Button className="proceed-to-checkout">Go To Recipes</Button>
          </Link>
        </Col>

        {/* New column for ingredientCart */}
<Col md={6}>
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
                ingredientName.toLowerCase()
              )
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
                <button onClick={() => decrementIQuantity(ingredientName)}>-</button>
                <button onClick={() => incrementIQuantity(ingredientName)}>+</button>
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
</Col>
      </Row>
      {modalContent && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <h2>{modalContent.name}</h2>
            <p>
              {modalContent.type === "instructions"
                ? modalContent.instructions
                : modalContent.ingredients}
            </p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CardComponent;
//hiii
