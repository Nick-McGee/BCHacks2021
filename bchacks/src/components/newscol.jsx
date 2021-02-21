import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';

const NewsCol = ({newsarray}) => {
    return (
        <Col sm={4}>
            <h3>News</h3>
            {
                newsarray.map(news => (<p><a href='#'>{news}</a></p>))
            }
      </Col>
    );
}
export default NewsCol;