import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/paymentform.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUserBudget , refreshUserDetails} = useAuth();
  const { subtotal } = location.state || { subtotal: 0 };

  // Define state variables for form inputs
  const [amount, setAmount] = useState(subtotal);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission

    try {
      await axios.put(`http://localhost:3000/api/budget/${user.userid}`, {
        spent_amount: amount,
      });
      console.log("Budget updated");

      // Update the AuthContext
      // updateUserBudget({
      //   ...user.currentBudget,
      //   spentAmount: user.currentBudget.spentAmount + amount,
      // });
      refreshUserDetails();
      console.log("User budget updated");

      // Navigate to success page
      navigate("/payment-success", { state: { amountSpent: amount } });
      console.log("Navigated to /payment-success");
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className='payment-form-container'>
      <h2 className='payment-form-title'>SwiftPay Payment Form</h2>
      <form className='payment-form' >
        <div className='payment-form-field'>
          <label className='payment-form-label' htmlFor="amount">Amount ($):</label>
          <input
            className='payment-form-input'
            id="amount"
            value={subtotal}
          />
        </div>
        <div className='payment-form-field'>
          <label className='payment-form-label' htmlFor="cardNumber">Card Number:</label>
          <input
            className='payment-form-input'
            type="text"
            id="cardNumber"
          />
        </div>
        <div className='payment-form-field'>
          <label className='payment-form-label' htmlFor="expiryDate">Expiry Date (MM/YY):</label>
          <input
            className='payment-form-input'
            type="text"
            id="expiryDate"
            
          />
        </div>
        <div className='payment-form-field'>
          <label className='payment-form-label' htmlFor="cvv">CVV:</label>
          <input
            className='payment-form-input'
            type="text"
            id="cvv"
          />
        </div>
        <button onClick={handleSubmit} className='payment-form-button' >Pay</button>
      </form>
    </div>
  );
};

export default PaymentForm;



