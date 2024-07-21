// src/components/BudgetForm.js

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BudgetForm = () => {
  const [period, setPeriod] = useState("weekly");
  const [allocatedAmount, setAllocatedAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ period, allocatedAmount });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Enter Your Budget</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group">
            <label htmlFor="period" style={styles.label}>
              Period
            </label>
            <select
              id="period"
              className="form-control"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              style={styles.input}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="allocatedAmount" style={styles.label}>
              Amount
            </label>
            <input
              type="number"
              id="allocatedAmount"
              className="form-control"
              value={allocatedAmount}
              onChange={(e) => setAllocatedAmount(e.target.value)}
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3"
            style={styles.button}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#2e2e2e",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  header: {
    color: "#e65c00",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    color: "black",
  },
  label: {
    color: "#ff6a00",
  },
  input: {
    backgroundColor: "white",
    color: "black",
    border: "1px solid #ff6a00",
  },
  button: {
    backgroundColor: "#ff6a00",
    borderColor: "#ff6a00",
    width: "100%",
  },
};

export default BudgetForm;
