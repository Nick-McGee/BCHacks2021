import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { JSCharting } from 'jscharting-react'
import { FaAngleUp, FaAngleDown, FaMale } from 'react-icons/fa';
import logo from './img/cover1.jpg'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


// Chart Data
const chartConfig = {
  debug: false,
  type: 'candlestick',
  palette: 'fiveColor18',
  legend: {
    template: '',
    position: ''
  },
  yAxis: {
    formatString: 'c',
  },
  xAxis_crosshair_enabled: true,
  defaultPoint: {
    outline_width: 0,
    altColor: '#ff4734',
    color: '#33ae5b',
    subvalue_line_color: '#555',
  },
  xAxis_scale_type: 'time',
  series: [
    {
      name: 'GME',
      points: [
        ['11/15/2014', 93.87, 94.91, 93.7, 93.76],
        ['11/16/2014', 93.91, 94.33, 92.07, 92.45],
        ['11/17/2014', 93.14, 93.55, 91.52, 91.6],
        ['11/18/2014', 92.56, 93, 92, 92.05],
        ['11/21/2014', 92.03, 92.62, 91.22, 91.59],
        ['11/22/2014', 91.9, 93.14, 91.81, 91.96],
        ['11/23/2014', 92.32, 92.5, 91.18, 91.7],
        ['11/25/2014', 91.87, 92.45, 91.41, 91.8],
        ['11/28/2014', 93.19, 93.99, 93.07, 93.06],
        ['11/29/2014', 93.54, 93.79, 93.11, 93.46],
        ['11/30/2014', 94.85, 95.54, 94.64, 95.52],
        ['12/1/2014', 95.44, 95.88, 95.22, 95.5],
        ['12/2/2014', 96.37, 96.47, 95.32, 95.7],
        ['12/5/2014', 96.42, 96.59, 95.08, 95.35],
        ['12/6/2014', 95.47, 96.27, 94.82, 96.01],
        ['12/7/2014', 95.83, 96.65, 95.5, 96.45],
        ['12/8/2014', 97.03, 98.29, 96.72, 96.92],
        ['12/9/2014', 97.67, 98.43, 97.62, 98.03],
        ['12/12/2014', 97.67, 98.53, 97.2, 98.48],
        ['12/13/2014', 98.74, 98.95, 97.76, 98],
        ['12/14/2014', 97.76, 98.46, 97.16, 97.61],
        ['12/15/2014', 98.51, 98.78, 97.86, 98.14],
        ['12/16/2014', 98.54, 98.62, 97.08, 97.49],
        ['12/19/2014', 97.92, 98.37, 96.98, 97.24],
        ['12/20/2014', 98.07, 98.92, 97.93, 98.82],
        ['12/21/2014', 98.98, 99.5, 98.7, 99.2],
        ['12/22/2014', 99.24, 99.35, 98.55, 98.6],
        ['12/23/2014', 98.84, 100.15, 98.76, 100.15],
        ['12/27/2014', 100.17, 100.82, 100, 100.55],
        ['12/28/2014', 100.73, 100.75, 99.46, 99.58],
        ['12/29/2014', 99.75, 101, 99.6, 100.81],
        ['12/30/2014', 100.43, 100.82, 100.06, 100.33],
        ['1/3/2015', 101.33, 101.59, 98.75, 98.84],
        ['1/4/2015', 99.11, 100.3, 98.76, 99.39],
        ['1/5/2015', 99.47, 100.4, 98.68, 99.83],
        ['1/6/2015', 100.09, 100.77, 99.87, 100.6],
        ['1/9/2015', 100.88, 100.93, 99.51, 99.64],
        ['1/10/2015', 100.24, 100.45, 99.35, 99.7],
        ['1/11/2015', 99.62, 100.11, 99.35, 99.93],
        ['1/12/2015', 100.37, 100.65, 100.07, 100.57],
        ['1/13/2015', 100.18, 100.43, 99.61, 100.35],
        ['1/17/2015', 100.59, 101.2, 100.05, 100.55],
        ['1/18/2015', 100.9, 101.87, 100.74, 101.56],
        ['1/19/2015', 101.77, 101.8, 100.7, 101.26],
        ['1/20/2015', 101.39, 102.22, 101.27, 101.74],
        ['1/23/2015', 101.71, 101.89, 100.04, 100.95],
        ['1/24/2015', 101.02, 101.02, 98.41, 98.75],
        ['1/25/2015', 98.41, 99.51, 98.05, 99.23],
        ['1/26/2015', 99.54, 99.71, 98.69, 99.18],
        ['1/27/2015', 98.57, 98.94, 98.35, 98.69],
        ['1/30/2015', 98.04, 98.81, 97.7, 98.69],
        ['1/31/2015', 99.04, 99.26, 98.25, 99.05],
        ['2/1/2015', 99.46, 99.49, 98.36, 98.4],
        ['2/2/2015', 98.26, 98.82, 98.26, 98.62],
        ['2/3/2015', 99.18, 100.27, 99.04, 100.01],
        ['2/6/2015', 99.96, 100, 99.34, 99.49],
        ['2/7/2015', 99.57, 101.18, 99.56, 100.91],
        ['2/8/2015', 101.12, 101.29, 99.6, 100.05]
      ]
    }
  ]
};


// Chart style
const chartStyle = {
  width: '90%',
	height: '400px',
	margin: '0px auto'
};

// Jumbotron styling
const jumboStyle = {
  backgroundColor: 'white'
};

// Text styling
const center = {
  marginTop: '8%'
}

const nameLineup = {
  paddingLeft: '2%',
  fontSize: '24px'
}

const statsLineup = {
  paddingTop: '1.5%'
}

const newsLineup = {
  paddingTop: '1%'
}


function App() {
  return (
    <div>
      <Jumbotron style={jumboStyle}>
        <Container>
          <Row>
            <Col sm={4} style={center}>
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
        <h1>Top 5 Stocks on Wall Street Bets</h1>
      </Container>
      
      <Container>
        <hr></hr>
        <Row>
          <Col sm={8}>
            <Row>
              <Col sm={5}>
                {/* class must be generated as good/bad by sentiment analysis */}
                <h1 class="good" id="ticker">GME</h1>
                <p style={nameLineup}>Gamestop Inc</p>
              </Col>
              <Col sm={5} style={statsLineup}>
                <p><FaAngleUp /> Weekly High: <span class="good" id="high-value">53.37 USD</span></p>
                <p><FaAngleDown />Weekly Low:  <span class="bad" id="low-value">38.60 USD</span></p>
                <p><FaMale />Sentiment Count: <span>7,234</span></p>
              </Col>
            </Row>
            <Row>
              <div style={chartStyle}><JSCharting options={chartConfig} /></div>
            </Row>
          </Col>
          <Col sm={4} style={newsLineup}>
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
