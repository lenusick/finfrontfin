import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function App() {
  const [selectedCode, setSelectedCode] = useState(null);
  const [searchCode, setSearchCode] = useState('');
  const [category, setCategory] = useState('');
  const [filteredCodes, setFilteredCodes] = useState([]);

  const BASE_URL = "https://http.cat/";

  const categories = {
    '0xx': [0],
    '1xx': [100, 101, 102, 103],
    '2xx': [200, 201, 202, 203, 204, 205, 206, 207, 208, 214, 226],
    '3xx': [300, 301, 302, 303, 304, 305, 306, 307, 308],
    '4xx': [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423, 424, 425, 426, 428, 429, 431, 444, 450, 451, 497, 498, 499],
    '5xx': [500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 521, 522, 523, 525, 530, 599]
  };

  useEffect(() => {
    const filtered = Object.values(categories).flat().filter(code => {
      const codeStr = code.toString();
      return (
        codeStr.includes(searchCode) && 
        (category === '' || codeStr.startsWith(category[0]))
      );
    });
    setFilteredCodes(filtered);
  }, [searchCode, category]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSelectedCode(null);
  };

  const handleSearchChange = (e) => {
    setSearchCode(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const code = parseInt(searchCode, 10);
    if (!isNaN(code)) {
      setSelectedCode(code);
    }
  };

  const handleReset = () => {
    setSelectedCode(null);
    setSearchCode('');
    setCategory('');
  };

  return (
    <div style={{ backgroundColor: '#F4D1FF', minHeight: '100vh' }}>
      <Navbar fixed='top' style={{ background: '#3B1347' }}>
        <Container className="d-block mw-75">
          <h1 className="text-center" style={{ color: 'white' }} onClick={handleReset}>HTTP CAT</h1>
          <Nav className="mx-auto d-flex justify-content-between">
            <Button variant='light' style={{ background: '#FFFFFF', color: '#3B1347' }} onClick={() => handleCategoryChange('0xx')}>0xx</Button>{' '}
            <Button variant='light' style={{ background: '#FFFFFF', color: '#3B1347' }} onClick={() => handleCategoryChange('1xx')}>1xx</Button>{' '}
            <Button variant='light' style={{ background: '#FFFFFF', color: '#3B1347' }} onClick={() => handleCategoryChange('2xx')}>2xx</Button>{' '}
            <Button variant='light' style={{ background: '#FFFFFF', color: '#3B1347' }} onClick={() => handleCategoryChange('3xx')}>3xx</Button>{' '}
            <Button variant='light' style={{ background: '#FFFFFF', color: '#3B1347' }} onClick={() => handleCategoryChange('4xx')}>4xx</Button>{' '}
            <Button variant='light' style={{ background: '#FFFFFF', color: '#3B1347' }} onClick={() => handleCategoryChange('5xx')}>5xx</Button>{' '}
          </Nav>
        </Container>
      </Navbar>

      <div style={{ backgroundColor: '#F4D1FF', paddingTop: '120px' }}>
        <Container className="mw-75">
          <Row className="justify-content-center mt-3">
            {selectedCode !== null && (
              <Col xs={12} md={8} className="text-center mb-3">
                <img src={`${BASE_URL}${selectedCode}`} alt={`HTTP ${selectedCode}`} style={{ width: '100%', maxWidth: '650px', maxHeight: '550px' }} />
              </Col>
            )}
          </Row>

          <Form onSubmit={handleSearchSubmit} className="d-flex justify-content-between">
            <Form.Group className="mb-3 me-2 flex-grow-1">
              <Form.Control style={{ background: '#ffffff'}} type="text" placeholder="Введите HTTP Код" value={searchCode} onChange={handleSearchChange} />
            </Form.Group>
            <Button style={{ background: '#3B1347', color: 'white', borderRadius: '20px', height: '40px' }} type="submit">
              Поиск
            </Button>
          </Form>

          <Row className="justify-content-center mt-3">
            {filteredCodes.map(code => (
              <Col key={code} xs={6} md={4} className="text-center mb-3">
                <Card onClick={() => setSelectedCode(code)} style={{ cursor: 'pointer' }}>
                  <Card.Body>
                    <Card.Title>{code}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;

