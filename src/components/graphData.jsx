import React from "react";
import { JSCharting } from 'jscharting-react';
import Container from 'react-bootstrap/Container';
import { FaAngleUp, FaAngleDown, FaMale } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NewsCol from './newscol';

  const chartStyle = {
    width: '90%',
      height: '400px',
      margin: '0px auto'
  };


const GraphData = ({stockClass, ticker, companyname, highvalue, lowvalue, sentimentcount, graphdatarray, newsarray}) => {
    return (
        <Container>
        <hr></hr>
        <Row>
          <Col sm={8}>
            <Row>
              <Col sm={5}>
                <h1 class={stockClass} id="ticker">{ticker}</h1>
                <p>{companyname}</p>
              </Col>
              <Col sm={5}>
                <p><FaAngleUp />Weekly High: <span class="good" id="high-value">{highvalue}</span></p>
                <p><FaAngleDown />Weekly Low:  <span class="bad" id="low-value">{lowvalue}</span></p>
                <p><FaMale />Sentiment Count: <span>{sentimentcount}</span></p>
              </Col>
            </Row>
            <Row>
              <div style={chartStyle}><JSCharting options={graphdatarray} /></div>
            </Row>
          </Col>
          <NewsCol newsArray={newsarray}/>
        </Row>
      </Container>
    );
}
export default GraphData;