import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';

const NewsCol = ({news}) => {
    return (
        <Col sm={4}>
            <h3>News</h3>
            {
                news.map(newsarticle => (<p><a href={newsarticle[1]}>{newsarticle[0]}</a></p>))
            }
      </Col>
    );
}
export default NewsCol;