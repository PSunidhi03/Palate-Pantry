import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Card, Button, Badge, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Card.css';

const CardComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cuisines-bucket.s3.ap-south-1.amazonaws.com/cuisines.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
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
    const results = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const incrementQuantity = (item) => {
    setCartItems(prevItems =>
      prevItems.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decrementQuantity = (item) => {
  setCartItems(prevItems =>
    prevItems.map(cartItem =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 0 }
        : cartItem
    ).filter(cartItem => cartItem.quantity > 0) // Remove items with quantity 0
  );
};

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
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
              </div>
            ))}
            <div className="cart-total">
              <p>Subtotal: ${calculateSubtotal()}</p>
              <Button className="proceed-to-checkout">Proceed to Checkout</Button>
            </div>
          </div>
        </Col>
        <Col md={9} className={modalContent ? 'blur-background' : ''}>
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
                  <Card.Img variant="top" src={item.image_url} alt="Card image" className="card-image" />
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
                      <Badge pill variant="primary" className="mr-2">{item.cuisine}</Badge>
                      <Badge pill variant="secondary" className="mr-2">{item.course}</Badge>
                      <Badge pill variant="success" className="mr-2">{item.diet}</Badge>
                      <Badge pill variant="danger" className="mr-2">{item.prep_time}</Badge>
                    </div>
                    <div className="button-container mt-3">
                      <Button variant="primary" onClick={() => addToCart(item)}>Add to Cart</Button>
                      <Button variant="secondary" onClick={() => handleViewRecipe(item, 'instructions')}>View Recipe</Button>
                      <Button variant="secondary" onClick={() => handleViewRecipe(item, 'ingredients')}>View Ingredients</Button>
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
            <button className="close-modal" onClick={closeModal}>&times;</button>
            <h2>{modalContent.name}</h2>
            <p>{modalContent.type === 'instructions' ? modalContent.instructions : modalContent.ingredients}</p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CardComponent;






