import React from 'react';
import { Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Utility/Header';
import Footer from '../Utility/Footer';

import '../../styles/Home.css'
const HomePage = () => {
  return (
    <>
    <Header/>
    <div className="home-page">
      <Container>
        <Row className="text-center welcome-section">
          <Col>
            <h2 className="welcome-text">Welcome to Palate-Pantry</h2>
            <p className="sub-text">Your Culinary Companion: From Palate to Pantry</p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col className="carousel-container">
            <Carousel className="image-carousel" interval={3000}>
              <Carousel.Item>
                <img
                  className="d-block mx-auto carousel-img"
                  src="/src/assets/1.png"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block mx-auto carousel-img"
                  src="/src/assets/2.png"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block mx-auto carousel-img"
                  src="/src/assets/img3.png"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <Row className="text-center description-section">
          <Col>
            <p className="description-text">
              In today's fast-paced world, where time and money are precious, Palate-Pantry is here to help you save both. Our app streamlines meal planning and grocery shopping within your budget, empowering you to manage your culinary tasks effortlessly.</p>
            <p className="description-text-2">
              From Smart Meal Planning & Custom Shopping Lists to Integrated Pantry Inventory & Allergen Management and Budget Management & Community Features , Palate-Pantry has it all
            </p>
          </Col>
        </Row>
      </Container>
      {/* <img src='/src/assets/cards.jpeg'></img> */}
      <div className="button-try-it d-flex justify-content-center ">
      <button className='try-it'>Try it now</button>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default HomePage;

