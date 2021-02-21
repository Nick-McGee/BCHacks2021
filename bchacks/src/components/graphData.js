import React, { useState } from "react";
import { JSCharting } from 'jscharting-react';
import Container from 'react-bootstrap/Container';
import { FaAngleUp, FaAngleDown, FaMale } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NewsCol from './newscol';
import { GetNews } from '../news-service';
import { getLowHigh } from '../minLow-service';
import { getCompanyName } from '../companyName-service';


const nameLineup = {
  paddingLeft: '2%',
  fontSize: '24px'
}

const statsLineup = {
  paddingTop: '1.5%'
}

const chartStyle = {
  width: '90%',
    height: '400px',
    margin: '0px auto'
};

const GraphData = ({stockClass, ticker, companyname, highvalue, lowvalue, sentimentcount, graphdatarray}) => {
    //Use ticker to retrieve the appropriate news

    const [news, setNews] = useState([]);
    if (news.length === 0) GetNews(ticker).then(result => setNews(result));
    if (news.length > 0) console.log(news[0][0]);

    const [minMax, setMaxMin] = useState([]);
    if(minMax.length === 0) getLowHigh(ticker).then(result => setMaxMin(result));
    if(minMax.length > 0) console.log(minMax);

    const [name, setName] = useState([]);
    if(name.length === 0) getCompanyName(ticker).then(result => setName(result));
    if(name.length > 0) console.log(name);

    return (
        <Container>
        <hr></hr>
        <Row>
          <Col sm={8}>
            <Row>
              <Col sm={5}>
                <h1 class={stockClass} id="ticker">{ticker}</h1>
                <p style={nameLineup}>{name}</p>
              </Col>
              <Col sm={5} style={statsLineup}>
                <p><FaAngleUp /> Weekly High: <span class="good" id="high-value">{minMax[1]} USD</span></p>
                <p><FaAngleDown /> Weekly Low:  <span class="bad" id="low-value">{minMax[0]} USD</span></p>
                <p><FaMale /> Sentiment Count: <span>{sentimentcount}</span></p>
              </Col>
            </Row>
            <Row>
              <div style={chartStyle}><JSCharting options={graphdatarray} /></div>
            </Row>
          </Col>
          <NewsCol news={news}/>
        </Row>
      </Container>
    );
}
export default GraphData;
