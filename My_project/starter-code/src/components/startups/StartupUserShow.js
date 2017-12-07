import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import { Grid, Row, Col, Image } from 'react-bootstrap';

const Startup = ({ name, image, industry, country, date, id, createdBy, deleteStartup }) => {
  return(
    <Grid fluid>
      <Row style={styles.container}>
        <Col lg={8} md={8} ls={8}>
          <div style={styles.imagecontainer}>
            <Image
              // src={image}
              src="http://ventureburn.com/wp-content/uploads/2015/01/clipular-2.png"
              thumbnail
              style={styles.image}
            />
          </div>
        </Col>
        <Col
          lg={4} md={4} ls={4}

        >
          <div style={styles.buttoncontainer}>
            <Link to={`/startups/${id}`}>Show more...</Link>
            { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <Link to={`/startups/${id}/edit`}>
              <p>Edit</p>
            </Link> }
            { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <button
              onClick={deleteStartup}
              value={id}
            >
              Delete
            </button> }
          </div>
        </Col>
      </Row>
    </Grid>
    // {/* <div style={styles.container}>
    //   <img src={image}/>
    //   <h1>{name}</h1>
    //   <p>{industry}</p>
    //   <p>{country}</p>
    //   <p>{date}</p>
    //   <p>id: {id}</p>
    //   <p>createdBy: {createdBy}</p>
    //   <p> Auth get current user: {Auth.getCurrentUser()} </p>
    //   <Link to={`/startups/${id}`}>Show more...</Link>
    //   { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <Link to={`/startups/${id}/edit`}>
    //     <p>Edit</p>
    //   </Link> }
    //   {' '}
    //   { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <button
    //     onClick={deleteStartup}
    //     value={id}
    //   >
    //     Delete
    //   </button> }
    // </div> */}
  );
};

export default Startup;

const styles = {
  container: {
    border: '3px solid red',
    height: '100%',
    width: 'inherit',
    margin: 'auto',
    textAlign: 'center'
  },
  imagecontainer: {
    height: '150px',
    width: '100%'
  },
  image: {
    maxHeight: '150px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttoncontainer: {
    height: '150px',
    border: '3px solid blue'
  }
};
