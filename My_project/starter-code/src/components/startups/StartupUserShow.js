import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Startup = ({ name, image, industry, country, date, id, createdBy, deleteStartup, _id }) => {
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
            <div style={styles.seemore}>
              <LinkContainer to={`/startups/${_id}`}>
                <Button
                  bsStyle="primary"
                >
                  See more ...
                </Button>
              </LinkContainer>
            </div>
            <div style={styles.edit}>
              { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <LinkContainer to={`/startups/${id}/edit`}>
                <Button bsStyle="primary">Edit</Button>
              </LinkContainer> }
            </div>
            <div style={styles.delete}>
              { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <Button
                onClick={deleteStartup}
                value={id}
                bsStyle="primary"
              >
                Delete
              </Button> }
            </div>
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
    // border: '3px solid black',
    height: '100%',
    width: 'inherit',
    margin: '30px auto',
    textAlign: 'center'
  },
  imagecontainer: {
    height: '150px',
    width: '100%',
    padding: '0 20px'
  },
  image: {
    maxHeight: '150px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    // padding: '0 20px'
  },
  buttoncontainer: {
    height: '150px',
    // border: '3px solid blue'
  },
  seemore: {
    // border: '2px solid yellow',
    height: '33%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  edit: {
    // border: '2px solid green',
    height: '33%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  delete: {
    // border: '2px solid maroon',
    height: '33%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
