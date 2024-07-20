import React, { useState } from 'react';
import '../../styles/userdashboard.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../Utility/Header';

// toast.configure();

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userName, setUserName] = useState('Samantha');
  const [userAge, setUserAge] = useState('');
  const [allergens, setAllergens] = useState('');
  const [familyMembers, setFamilyMembers] = useState([{ name: '', age: '', allergens: '' }]);
  const [budgetType, setBudgetType] = useState('weekly');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    setFamilyMembers([...familyMembers, { name: '', age: '', allergens: '' }]);
    setIsEditingFamily([...isEditingFamily, true]);
  };

  const handleSave = () => {
    if (!userName.trim()) {
      toast.error('Name is required for the user');
      return;
    }

    for (const member of familyMembers) {
      if (!member.name.trim()) {
        toast.error('Name is required for all family members');
        return;
      }
    }

    const userData = {
      userName,
      userAge,
      allergens,
      familyMembers,
      budgetType,
      budgetAmount,
      startDate,
      endDate,
      expenses,
      orders,
    };
    console.log(userData);
    setIsEditingUser(false);
    setIsEditingFamily(new Array(familyMembers.length).fill(false));
    toast.success('Changes saved successfully');
  };

  const handleEditUser = () => {
    setIsEditingUser(true);
  };

  const handleEditFamily = (index) => {
    const newIsEditingFamily = [...isEditingFamily];
    newIsEditingFamily[index] = true;
    setIsEditingFamily(newIsEditingFamily);
  };

  const handleDeleteUser = () => {
    setUserName('');
    setUserAge('');
    setAllergens('');
    toast.success('User deleted successfully');
  };

  const handleDeleteFamilyMember = (index) => {
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers.splice(index, 1);
    setFamilyMembers(newFamilyMembers);
    toast.success('Family member deleted successfully');
  };

  const calculateDates = () => {
    let newStartDate = new Date();
    let newEndDate = new Date();
    if (budgetType === 'weekly') {
      newEndDate.setDate(newStartDate.getDate() + 6);
    } else if (budgetType === 'monthly') {
      newEndDate.setMonth(newStartDate.getMonth() + 1);
      newEndDate.setDate(newStartDate.getDate() - 1);
    }
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const renderDashboard = () => (
    <div>
        <ToastContainer/>
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
              required
            />
          </div>
          <div className="formGroup">
            <label className="label">Age</label>
            <input
              type="number"
              className="input"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
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
          <button className="deleteButton" onClick={handleDeleteUser}>Delete</button>
        </div>
      ) : (
        <div className="card">
          <h2>{userName}</h2>
          <p>Age: {userAge}</p>
          <p>Allergens: {allergens}</p>
          <button className="editButton" onClick={handleEditUser}>Edit</button>
        </div>
      )}
    </div>
  );

  const renderBudget = () => (
    <div>
      <h1 className="header">Budget</h1>
      <div className="formGroup">
        <label className="label">Set Budget:</label>
        <div>
          <label>
            <input
              type="radio"
              value="weekly"
              checked={budgetType === 'weekly'}
              onChange={() => { setBudgetType('weekly'); calculateDates(); }}
            />
            Weekly
          </label>
          <label>
            <input
              type="radio"
              value="monthly"
              checked={budgetType === 'monthly'}
              onChange={() => { setBudgetType('monthly'); calculateDates(); }}
            />
            Monthly
          </label>
        </div>
        <label className="label">Budget Range:</label>
        <select className="input" value={budgetAmount} onChange={(e) => setBudgetAmount(e.target.value)}>
          <option value="">Select a range</option>
          <option value="100-500">$100 - $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000-2000">$1000 - $2000</option>
        </select>
      </div>
      <h2 className="header">Budget Period</h2>
      <p>Start Date: {startDate.toDateString()}</p>
      <p>End Date: {endDate.toDateString()}</p>
      <Calendar
        value={startDate}
        onChange={date => setStartDate(date)}
      />
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
                  required
                />
              </div>
              <div className="formGroup">
                <label className="label">Age</label>
                <input
                  type="number"
                  className="input"
                  value={member.age}
                  onChange={(e) => handleFamilyMemberChange(index, 'age', e.target.value)}
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
              <button className="deleteButton" onClick={() => handleDeleteFamilyMember(index)}>Delete</button>
            </div>
          ) : (
            <div>
              <h2>{member.name}</h2>
              <p>Age: {member.age}</p>
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

  const renderMealPlan = () => (
    <div>
      <h1 className="header">Plan Meals</h1>
      <p>Feature to plan meals for a week or a month will be implemented here.</p>
    </div>
  );

  return (
    <>
    <Header/>
    <ToastContainer/>
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile">
          <img src="/src/assets/user-profile-filled-svgrepo-com.svg" alt="Profile" className="profile-img"/>
          <h2>User</h2>
          <p>User@email.com</p>
        </div>
        <nav className="nav-menu">
          <a href="#dashboard" className="nav-item" onClick={() => setActiveSection('dashboard')}>Dashboard</a>
          <a href="#budget" className="nav-item" onClick={() => setActiveSection('budget')}>Budget</a>
          <a href="#family" className="nav-item" onClick={() => setActiveSection('family')}>Family</a>
          <a href="#orders" className="nav-item" onClick={() => setActiveSection('orders')}>View Orders</a>
          <a href="#mealplan" className="nav-item" onClick={() => setActiveSection('mealplan')}>Plan Meals</a>
          <a href="#settings" className="nav-item" onClick={() => setActiveSection('settings')}>Settings</a>
        </nav>
      </div>
      <div className="content">
        {activeSection === 'dashboard' && renderDashboard()}
        {activeSection === 'budget' && renderBudget()}
        {activeSection === 'family' && renderFamily()}
        {activeSection === 'orders' && renderOrders()}
        {activeSection === 'mealplan' && renderMealPlan()}
        {activeSection === 'settings' && <h1 className="header">Settings</h1>}
      </div>
    </div>
    </>
  );
};

export default UserDashboard;




