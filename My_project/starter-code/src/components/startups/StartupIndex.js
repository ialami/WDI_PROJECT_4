import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import { Grid, Col, Row, Thumbnail } from 'react-bootstrap';

const Startup = ({ name, image, industry, country, date, id }) => {

  const link = (!!Auth.getCurrentUser()) ? `/startups/${id}` : "/login" ;

  return(
    <div>
      <Grid>
        <Row>
          <Col xs={6} md={6} lg={4}>
            <Thumbnail
              src={image}
              alt="242x200"
            >
              <h1>{name}</h1>
              <p>{industry}</p>
              <p>{country}</p>
              <p>{date}</p>
            </Thumbnail>
          </Col>
        </Row>
      </Grid>
      <Link to={link}>Show more...</Link>
    </div>
  );
};

export default Startup;
