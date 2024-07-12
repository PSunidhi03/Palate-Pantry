import React from 'react'

function Recipe() {
  const cartItems = [
    { name: 'Paneer 65', price: 7.90, quantity: 2 },
    { name: 'Lemon rice', price: 7.90, quantity: 2 },
    { name: 'Cheese Cake', price: 7.90, quantity: 2 },
  ];
  return (
    <div>
      <div className="col-md-4">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Cart</h5>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name}
                <span className="badge badge-primary badge-pill">${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <p>Subtotal:</p>
              <p>Delivery:</p>
              <p>Total:</p>
            </div>
            <div className="col-md-6">
              <p>₹200.00</p>
              <p>₹20.00</p>
              <p>₹220.00</p>
            </div>
          </div>
          <button className="btn btn-primary btn-block mt-3" onClick={() => console.log('Proceed to checkout')}>
            Proceed To checkout
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Recipe
