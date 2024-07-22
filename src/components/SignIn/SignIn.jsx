import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/SignIn.css";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true); // Set loading to true when sign-in process starts
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          username,
          password,
        },
      );
      login(response.data);
      console.log("Login success!", response.data);
      toast.success("Login successful!");
      setLoading(false); // Set loading to false on success
      // Handle success, e.g., redirect or show a success message
      navigate("/home");
    } catch (error) {
      console.error("Login failed!", error);
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect username or password.");
      } else {
        toast.error("Login failed. Please try again later.");
      }
      setLoading(false); // Set loading to false on failure
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="sign-in-page container-fluid p-0">
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
      <div className="left-banner">
        <div className="logo">
          <img src="/src/assets/logo.png" alt="" className="logo-img" />
        </div>
      </div>
      <div className="signin-form">
        <div className="row">
          <div className="col-6">
            <p>Welcome to</p>
            <p id="p2">Palate-pantry</p>
          </div>
          <div className="col-6 text-right">
            <p>No Account?</p>
            <a href="/signup">
              <p>Sign up</p>
            </a>
          </div>
        </div>
        <div>
          <label
            htmlFor="username"
            style={{ color: "black", fontSize: "18px" }}
          >
            Enter your username or email address
          </label>
          <br />
          <input
            name="username"
            type="text"
            placeholder="Username or email address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
        </div>
        <div>
          <label
            htmlFor="password"
            style={{ color: "black", fontSize: "18px" }}
          >
            Enter your password
          </label>
          <br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forgot Password?</a>
        </div>
        <div>
          <button
            className="signin-button"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
        <div
          className="text-center mt-3"
          style={{ color: "black", fontSize: "18px" }}
        >
          Or
        </div>
        <Container className="sign-in-buttons">
          <Row>
            <Col className="text-center">
              <Button variant="light" className="sign-in-button">
                <img
                  src="/src/assets/google.png"
                  alt="Google"
                  className="button-icon"
                />
                Sign in with Google
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SignIn;
