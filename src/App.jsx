import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/HomePage/Home";
import SignIn from "./components/SignIn/SignIn";
import Recipe from "./components/Recipe/Recipe";
import UserDashboard from "./components/User/UserDashboard";
import SignUp from "./components/SignUp/SignUp";
import { AuthProvider } from "./components/Auth/AuthContext";
import CardComponent from "./components/Recipe/DataFetch";
import AboutUs from "./components/Utility/AboutusPage/Aboutus";
import PantryPage from "./components/pantrypage/pantry";
import Pantry from "./components/Recipe/pantry";
import CartWithRecipe from "./components/Recipe/finalcart";
import HomePage from "./components/HomePage/Home";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/recipe" element={<CardComponent />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/final-cart" element={<CartWithRecipe />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
    // <CardComponent/>
    // <AboutUs/>
    // <PantryPage/>
  );
}

export default App;
