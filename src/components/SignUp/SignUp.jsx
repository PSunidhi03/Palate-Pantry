import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/SignIn.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSignUp = async () => {
    setLoading(true); // Set loading to true when sign-up process starts
    try {
      const response = await axios.post('http://localhost:3000/api/users/', {
        username,
        password,
        email,
        contactNumber
      });
      console.log('Sign up success!', response.data);
      toast.success('Sign up successful!');
      setLoading(false); // Set loading to false on success
      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      console.error('Sign up failed!', error);
      if (error.response && error.response.status === 400) {
        toast.error('Invalid data. Please check your inputs.');
      } else {
        toast.error('Sign up failed. Please try again later.');
      }
      setLoading(false); // Set loading to false on failure
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className='sign-in-page container-fluid p-0'>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='left-banner'>
        <div className='logo'>
          <img src="/src/assets/logo.png" alt="" className="logo-img" />
        </div>
      </div>
      <div className='signin-form'>
        <div className='row'>
          <div className='col-6'>
            <p>Welcome to</p>
            <p id='p2'>Palate-pantry</p>
          </div>
          <div className='col-6 text-right'>
            <p>Already have an account?</p>
            <a href='#'><p>Sign in</p></a>
          </div>
        </div>
        <div>
          <label htmlFor="username" style={{ color: 'black', fontSize: '18px' }}>Enter your username</label><br />
          <input
            name='username'
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
        </div>
        <div>
          <label htmlFor="password" style={{ color: 'black', fontSize: '18px' }}>Enter your password</label><br />
          <input
            name='password'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" style={{ color: 'black', fontSize: '18px' }}>Enter your email address</label><br />
          <input
            name='email'
            type="email"
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
        </div>
        <div>
          <label htmlFor="contactNumber" style={{ color: 'black', fontSize: '18px' }}>Enter your contact number</label><br />
          <input
            name='contactNumber'
            type="text"
            placeholder='Contact number'
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          /><br />
        </div>
        <div>
          <button className='signin-button' onClick={handleSignUp} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


