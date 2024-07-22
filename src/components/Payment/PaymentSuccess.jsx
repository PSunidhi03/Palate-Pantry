import React from "react";
import { useAuth } from "../Auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const PaymentSuccess = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { amountSpent } = location.state || { amountSpent: 0 };

  const remainingBudget = user.currentBudget.allocatedAmount - user.currentBudget.spentAmount - amountSpent;

  return (
    <Container>
      <Row>
        <Col>
          <h1>Purchase Successful!</h1>
          <h3>Amount Spent: Rs {amountSpent.toFixed(2)}</h3>
          <h3>Remaining Budget: Rs {remainingBudget.toFixed(2)}</h3>
          <Button onClick={() => navigate("/home")}>Back to Home</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
