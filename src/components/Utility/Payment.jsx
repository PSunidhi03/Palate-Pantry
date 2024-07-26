import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/paymentform.css'

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!amount || !cardNumber || !expiryDate || !cvv) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Replace with your SwiftPay API endpoint
      const response = await axios.post('https://api.swiftpay.com/v1/charges', {
        amount: amount,
        card_number: cardNumber,
        expiry_date: expiryDate,
        cvv: cvv,
      });

      // Handle successful response
      setSuccess('Payment successful!');
      setError(null);
    } catch (err) {
      // Handle error response
      setError('Payment failed. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>SwiftPay Payment Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount ($):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date (MM/YY):</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default PaymentForm;
