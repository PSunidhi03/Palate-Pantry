import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Card, Button, Badge, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Card.css'; // Make sure to create this CSS file

const CardComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cuisines-bucket.s3.ap-south-1.amazonaws.com/cuisines.csv');
        const reader = response.body.getReader();
        const result = await reader.read(); // raw array
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value); // the csv text
        const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
        setData(results.data); // set the data parsed from CSV
        setFilteredData(results.data); // set the filtered data parsed from CSV
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={3}>
          {/* Sidebar content like Cart can go here */}
        </Col>
        <Col md={9}>
          <Form.Control
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          {filteredData.map((item, index) => (
            <Card className="custom-card mb-3" key={index}>
              <Row noGutters>
                <Col md={4}>
                  <Card.Img variant="top" src={item.image_url} alt="Card image" className="card-image" />
                </Col>
                <Col md={8}>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{item.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {truncateText(item.description, 100)} <a href="#">Read More</a>
                    </Card.Subtitle>
                    <div className="badge-container">
                      <Badge pill variant="primary" className="mr-1">{item.cuisine}</Badge>
                      <Badge pill variant="secondary" className="mr-1">{item.course}</Badge>
                      <Badge pill variant="success" className="mr-1">{item.diet}</Badge>
                      <Badge pill variant="info" className="mr-1">{item.prep_time}</Badge>
                    </div>
                    <div className="button-container">
                      <Button variant="primary" className="mt-2" onClick={() => alert(item.ingredients)}>View Recipe</Button>
                      <Button variant="secondary" className="mt-2 ml-2" onClick={() => alert(item.instructions)}>Procedure</Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CardComponent;


