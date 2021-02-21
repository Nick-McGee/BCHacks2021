import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';

const NewsCol = ({newsArray}) => {
    return (
        <Col sm={4}>
            <h3>News</h3>
            {
                newsArray.map(news => (<p><a href="#">{news}</a></p>))
            }
      </Col>
    );
}
export default NewsCol;