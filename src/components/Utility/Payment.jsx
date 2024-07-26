import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/paymentform.css';

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
    <div className='payment-form-container'>
      <h2 className='payment-form-title'>SwiftPay Payment Form</h2>
      {error && <p className='payment-form-error'>{error}</p>}
      {success && <p className='payment-form-success'>{success}</p>}
      <form className='payment-form' onSubmit={handleSubmit}>
        <div className='payment-form-field'>
          <label className='payment-form-label' htmlFor="amount">Amount ($):</label>
          <input
            className='payment-form-input'
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className='payment-form-field'>
          <label className='payment-form-label' htmlFor="cardNumber">Card Number:</label>
          <input
            className='payment-form-input'
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className='payment-form-field'>
          <label className='payment-form-label' htmlFor="expiryDate">Expiry Date (MM/YY):</label>
          <input
            className='payment-form-input'
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <div className='payment-form-field'>
          <label className='payment-form-label' htmlFor="cvv">CVV:</label>
          <input
            className='payment-form-input'
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <button className='payment-form-button' type="submit">Pay</button>
      </form>
    </div>
  );
};

export default PaymentForm;

