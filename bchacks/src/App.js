import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './img/cover1.jpg'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const jumboStyle = {
  backgroundColor: 'white'
};

function App() {
  return (
    <div>
      <Jumbotron style={jumboStyle}>
        <Container>
          <Row>
            <Col sm={4}>
              <h1>Wall Street Bets Sentiment Analysis</h1>
              <p>Using sentiment analysis, we analyze what stocks the users on r/wallstreetbets are talking about.</p>
            </Col>
            <Col sm={2}></Col>
            <Col sm={6}>
              <img class="main-photo" src={logo} alt="WSB Logo"></img>
            </Col>
          </Row>
        </Container>
      </Jumbotron>

      <Container>
        <hr></hr>
        <Row>
          <Col sm={8}>
            <Row>
              <Col sm={5}>
                <h1 class="good" id="ticker">GME</h1>
                <p>Gamestop Inc</p>
              </Col>
              <Col sm={5}>
                <p>Weekly High: <span class="good" id="high-value">53.37 USD</span></p>
                <p>Weekly Low:  <span class="bad" id="low-value">38.60 USD</span></p>
                <p>Sentiment Count: <span>7,234</span></p>
              </Col>
            </Row>
            <Row>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Row>
          </Col>
          <Col sm={4}>
            <h3>News</h3>
            <p><a href="#">Article 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id eu nisl nunc mi ipsum faucibus vitae aliquet nec.</a></p>
            <p><a href="#">Article 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id eu nisl nunc mi ipsum faucibus vitae aliquet nec.</a></p>
            <p><a href="#">Article 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id eu nisl nunc mi ipsum faucibus vitae aliquet nec.</a></p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
