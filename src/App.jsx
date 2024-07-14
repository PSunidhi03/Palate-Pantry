import './App.css'
// import Header from './components/Utility/Header'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import Home from './components/HomePage/Home'
import SignIn from './components/SignIn/SignIn'
import Recipe from './components/Recipe/Recipe';
import CardComponent from './components/Recipe/DataFetch';
import UserDashboard from './components/User/UserDashboard';
function App() {


  return (
    <>
      {/* <SignIn /> */}
      {/* <Home/> */}
      {/* <Recipe/> */}
     {/* <Container> */}
        {/* <Row> */}
          {/* <Col md={2}> */}
            {/* Sidebar content like Cart can go here */}
          {/* </Col> */}
          {/* <Col md={10}> */}
            {/* <CardComponent /> */}
          {/* </Col> */}
        {/* </Row> */}
      {/* </Container> */}
      {/* <CardComponent/> */}
    <UserDashboard/>
    </>
  )
}

export default App
