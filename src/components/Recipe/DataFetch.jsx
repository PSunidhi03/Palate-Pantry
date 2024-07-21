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
import { useNavigate, Link } from "react-router-dom";

const CardComponent = () => {
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
    setCartItems(recipeCart);
  }, [recipeCart]);

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
    console.log(uniqueIngredients);
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
        setFilteredData(results.data); // Initialize filteredData with fetched data
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
          "https://cuisines-bucket.s3.ap-south-1.amazonaws.com/pantryingredients.csv",
        );
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const results = Papa.parse(csv, { header: true });
        setIngredientsData(results.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIngredients();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data); // Show all data if searchTerm is empty
    } else {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(results);
    }
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

  const calculateSubtotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
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

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={3}>
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
              <p>Subtotal: ${calculateSubtotal()}</p>
              <Link to="/final-cart">
                <Button className="proceed-to-checkout">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        <Col md={9} className={modalContent ? "blur-background" : ""}>
          <Form.Control
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 m-3"
          />
          {filteredData.map((item, index) => (
            <Card className="custom-card mb-3" key={index}>
              <Row noGutters>
                <Col md={4}>
                  <Card.Img
                    variant="top"
                    src={item.image_url}
                    alt="Card image"
                    className="card-image"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{item.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {truncateText(item.description, 100)}
                      <span
                        className="read-more-toggle"
                        onClick={() => handleReadMoreToggle(index)}
                      >
                        {item.showMore ? "Read Less" : "Read More"}
                      </span>
                      {item.showMore && (
                        <div className="read-more-content">
                          {item.description}
                        </div>
                      )}
                    </Card.Subtitle>
                    <div className="badge-container">
                      <Badge pill variant="primary" className="mr-2">
                        {item.cuisine}
                      </Badge>
                      <Badge pill variant="secondary" className="mr-2">
                        {item.course}
                      </Badge>
                      <Badge pill variant="success" className="mr-2">
                        {item.diet}
                      </Badge>
                      <Badge pill variant="danger" className="mr-2">
                        {item.prep_time}
                      </Badge>
                    </div>
                    <div className="button-container mt-3">
                      <Button variant="primary" onClick={() => addToCart(item)}>
                        Add to Cart
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleViewRecipe(item, "instructions")}
                      >
                        View Recipe
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleViewRecipe(item, "ingredients")}
                      >
                        View Ingredients
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
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
