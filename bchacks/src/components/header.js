import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const jumboStyle = {
    backgroundColor: 'white'
  };

const Header = ({header, parag, imgsrc}) => {
    return (
        <Jumbotron style={jumboStyle}>
        <Container>
          <Row>
            <Col sm={4}>
              <h1>{header}</h1>
              <p>{parag}</p>
            </Col>
            <Col sm={2}></Col>
            <Col sm={6}>
              <img class="main-photo" src={imgsrc} alt="WSB Logo"></img>
            </Col>
          </Row>
        </Container>
        </Jumbotron>
    );
}
export default Header;