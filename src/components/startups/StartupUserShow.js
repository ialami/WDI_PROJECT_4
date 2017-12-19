import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Startup = ({ name, image, industry, country, date, id, createdBy, deleteStartup }) => {
  return(
    <Grid fluid>
      <Row style={styles.container}>
        <Col lg={8} md={8} sm={8}>
          <div style={styles.imagecontainer}>
            <Image
              // src={image}
              src={image}
              thumbnail
              style={styles.image}
            />
          </div>
        </Col>
        <Col
          lg={4} md={4} sm={4}
          style={styles.buttonsCol}
        >
          <div style={styles.buttoncontainer}>
            <div style={styles.seemore}>
              <LinkContainer to={`/startups/${id}`}>
                <div style={styles.buttoncontainer}>
                  <button
                    className="btn btn-primary"
                    style={styles.button}>
                    See more ...
                  </button>
                </div>
              </LinkContainer>
            </div>
            <div style={styles.edit}>
              { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <LinkContainer to={`/startups/${id}/edit`}>
                <div style={styles.buttoncontainer}>
                  <button
                    className="btn btn-primary"
                    style={styles.button}>
                    Edit
                  </button>
                </div>
              </LinkContainer> }
            </div>
            <div style={styles.delete}>
              { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <div style={styles.buttoncontainer}>
                <button
                  className="btn btn-primary"
                  style={styles.button}
                  onClick={deleteStartup}
                  value={id}
                >
                Delete
                </button>
              </div> }
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
    height: '210px',
    width: 'inherit',
    margin: '30px auto',
    textAlign: 'center'
  },
  imagecontainer: {
    height: '210px',
    width: '100%',
    padding: '0 20px'
  },
  image: {
    maxHeight: '210px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    // padding: '0 20px'
  },
  buttoncontainer: {
    height: '33%',
    // border: '3px solid blue',
    textAlign: 'center',
    margin: '2px 0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '200px',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '15',
    fontWeight: 'bold',
    margin: '10px 0',
    alignItems: 'center',
    justifyContent: 'center',
    height: '45px'
  },
  buttonsCol: {
    // border: '2px solid red'
    // height: '210px'
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
