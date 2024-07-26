import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUserBudget } = useAuth();
  const { subtotal } = location.state || { subtotal: 0 };

  const handlePayment = async () => {
    try {
      // Calculate the new spent amount

      // Make API call to update budget
      await axios.put(`http://localhost:3000/api/budget/${user.userid}`, {
        spent_amount: subtotal,
      });

      // Update the AuthContext
      updateUserBudget({
        ...user.currentBudget,
        spentAmount: newSpentAmount,
      });

      // Navigate to success page
      navigate("/payment-success", { state: { amountSpent: subtotal } });
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Review Your Purchase</h1>
          <h3>Total: Rs {subtotal.toFixed(2)}</h3>
          <Button onClick={handlePayment}>Confirm Payment</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
