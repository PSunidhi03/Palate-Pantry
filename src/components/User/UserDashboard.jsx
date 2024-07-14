import React, { useState } from 'react';
import '../../styles/userdashboard.css';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userName, setUserName] = useState('Samantha');
  const [budget, setBudget] = useState('');
  const [budgetType, setBudgetType] = useState('weekly');
  const [foodPreferences, setFoodPreferences] = useState('');
  const [allergens, setAllergens] = useState('');
  const [familyMembers, setFamilyMembers] = useState([{ name: '', preferences: '', allergens: '' }]);
  const [expenses, setExpenses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingFamily, setIsEditingFamily] = useState(new Array(familyMembers.length).fill(false));

  const handleFamilyMemberChange = (index, field, value) => {
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers[index][field] = value;
    setFamilyMembers(newFamilyMembers);
  };

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: '', preferences: '', allergens: '' }]);
    setIsEditingFamily([...isEditingFamily, true]);
  };

  const handleSave = () => {
    const userData = {
      userName,
      budget,
      budgetType,
      foodPreferences,
      allergens,
      familyMembers,
      expenses,
      orders,
    };
    console.log(userData);
    setIsEditingUser(false);
    setIsEditingFamily(new Array(familyMembers.length).fill(false));
    // Here you can send the userData to your backend or perform any necessary actions
  };

  const handleEditUser = () => {
    setIsEditingUser(true);
  };

  const handleEditFamily = (index) => {
    const newIsEditingFamily = [...isEditingFamily];
    newIsEditingFamily[index] = true;
    setIsEditingFamily(newIsEditingFamily);
  };

  const renderDashboard = () => (
    <div>
      <h1 className="header">User Dashboard</h1>
      {isEditingUser ? (
        <div className="form-container">
          <div className="formGroup">
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label className="label">Food Preferences</label>
            <input
              type="text"
              className="input"
              value={foodPreferences}
              onChange={(e) => setFoodPreferences(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label className="label">Allergens</label>
            <input
              type="text"
              className="input"
              value={allergens}
              onChange={(e) => setAllergens(e.target.value)}
            />
          </div>
          <button className="saveButton" onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="card">
          <h2>{userName}</h2>
          <p>Food Preferences: {foodPreferences}</p>
          <p>Allergens: {allergens}</p>
          <button className="editButton" onClick={handleEditUser}>Edit</button>
        </div>
      )}
    </div>
  );

  const renderExpenses = () => (
    <div>
      <h1 className="header">Expenses</h1>
      <div className="formGroup">
        <label className="label">Set Budget:</label>
        <div>
          <label>
            <input
              type="radio"
              value="weekly"
              checked={budgetType === 'weekly'}
              onChange={() => setBudgetType('weekly')}
            />
            Weekly
          </label>
          <label>
            <input
              type="radio"
              value="monthly"
              checked={budgetType === 'monthly'}
              onChange={() => setBudgetType('monthly')}
            />
            Monthly
          </label>
        </div>
        <label className="label">Budget Range:</label>
        <select className="input" value={budget} onChange={(e) => setBudget(e.target.value)}>
          <option value="">Select a range</option>
          <option value="100-500">$100 - $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000-2000">$1000 - $2000</option>
        </select>
      </div>
      <h2 className="header">Previous Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{expense}</li>
        ))}
      </ul>
    </div>
  );

  const renderFamily = () => (
    <div>
      <h1 className="header">Family</h1>
      {familyMembers.map((member, index) => (
        <div key={index} className="card">
          {isEditingFamily[index] ? (
            <div>
              <div className="formGroup">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  value={member.name}
                  onChange={(e) => handleFamilyMemberChange(index, 'name', e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label className="label">Preferences</label>
                <input
                  type="text"
                  className="input"
                  value={member.preferences}
                  onChange={(e) => handleFamilyMemberChange(index, 'preferences', e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label className="label">Allergens</label>
                <input
                  type="text"
                  className="input"
                  value={member.allergens}
                  onChange={(e) => handleFamilyMemberChange(index, 'allergens', e.target.value)}
                />
              </div>
              <button className="saveButton" onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <h2>{member.name}</h2>
              <p>Preferences: {member.preferences}</p>
              <p>Allergens: {member.allergens}</p>
              <button className="editButton" onClick={() => handleEditFamily(index)}>Edit</button>
            </div>
          )}
        </div>
      ))}
      <button className="addButton" onClick={addFamilyMember}>Add Family Member</button>
    </div>
  );

  const renderOrders = () => (
    <div>
      <h1 className="header">Orders</h1>
      <h2 className="header">Previous Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{order}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile">
          <img src="profile-placeholder.png" alt="Profile" className="profile-img"/>
          <h2>Samantha</h2>
          <p>samantha@email.com</p>
        </div>
        <nav className="nav-menu">
          <a href="#dashboard" className="nav-item" onClick={() => setActiveSection('dashboard')}>Dashboard</a>
          <a href="#expenses" className="nav-item" onClick={() => setActiveSection('expenses')}>Expenses</a>
          <a href="#family" className="nav-item" onClick={() => setActiveSection('family')}>Family</a>
          <a href="#orders" className="nav-item" onClick={() => setActiveSection('orders')}>View Orders</a>
          <a href="#settings" className="nav-item" onClick={() => setActiveSection('settings')}>Settings</a>
        </nav>
      </div>
      <div className="content">
        {activeSection === 'dashboard' && renderDashboard()}
        {activeSection === 'expenses' && renderExpenses()}
        {activeSection === 'family' && renderFamily()}
        {activeSection === 'orders' && renderOrders()}
        {activeSection === 'settings' && <h1 className="header">Settings</h1>}
      </div>
    </div>
  );
};

export default UserDashboard;



