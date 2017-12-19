import React from 'react';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';

const Startup = ({ name, image, industry, country, date, founders, fundingtype, description, partnering, website, incubator, createdBy, id, deleteStartup, user }) => {
  return(
    <Grid fluid style={styles.grid}>
      {/* <LinkContainer to={`/users/${createdBy}`}>
        { user.fullName && <a href="#">Cretaed by: {user.fullName}</a> }
      </LinkContainer> */}
      {/* <BackButton /> */}
      <Row style={styles.mainContainer}>
        <Col lg={8} md={8} sm={12}>
          <div style={styles.imagecontainer}>
            <Image
              src={image}
              style={styles.image}
            />
          </div>
          <h2 style={styles.titledescription}>Description</h2>
          <hr style={styles.lineBreak}></hr>
          <p style={styles.description}>{description}</p>
          <h2 style={styles.titlepartnering}>Partnering strategy</h2>
          <hr style={styles.lineBreak}></hr>
          <p style={styles.partnering}>{partnering}</p>
          <LinkContainer style={styles.createdBy} to={`/users/${createdBy}`}>
            <div>
              { user.fullName && <a href="#">Created by: {user.fullName}</a> }
            </div>
          </LinkContainer>
        </Col>
        <Col style={styles.informationcontainer} lg={4} md={4} sm={12}>
          <div style={styles.information}>
            <h3>Industry</h3>
            <p>{industry}</p>
          </div>
          <div style={styles.information}>
            <h3>Country</h3>
            <p>{country}</p>
          </div>
          <div style={styles.information}>
            <h3>Founded year</h3>
            <p>{date}</p>
          </div>
          <div style={styles.information}>
            <h3>Founders</h3>
            <p>{founders}</p>
          </div>
          <div style={styles.information}>
            <h3>Website</h3>
            <a href={website}>{website}</a>
          </div>
          <div style={styles.information}>
            <h3>Latest funding stage</h3>
            <p>{fundingtype}</p>
          </div>
          <div style={styles.information}>
            <h3>Incubator</h3>
            <p>{incubator}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <div style={styles.buttoncontainer}>
          { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <LinkContainer style={styles.button} to={`/startups/${id}/edit`}>
            <Button style={styles.button}>Edit</Button>
          </LinkContainer> }
          { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <Button style={styles.button} onClick={deleteStartup}>
            Delete
          </Button> }
        </div>
      </Row>
    </Grid>
  );
};

export default Startup;

const styles = {
  grid: {
    // border: '2px solid red'
  },
  mainContainer: {
    // border: '3px solid green'
  },
  imagecontainer: {
    height: '100px',
    width: '100%',
    padding: '20px 0'
  },
  image: {
    height: '100px',
    margin: 'auto',
    display: 'flex'
  },
  lineBreak: {
    color: 'white',
    height: '2px',
    backgroundColor: 'white'
  },
  titlename: {
    margin: '10px auto',
    textAlign: 'center'
  },
  titledescription: {

  },
  description: {
    marginBottom: '50px',
    textAlign: 'justify',
    padding: '5px',
    fontWeight: 'bold'
  },
  titlepartnering: {

  },
  partnering: {
    marginBottom: '0',
    textAlign: 'justify',
    padding: '5px',
    fontWeight: 'bold'
  },
  createdBy: {
    marginTop: '60px',
    // border: '3px solid red',
    color: 'white'
  },
  information: {
    padding: '5px'
  },
  informationcontainer: {
    // border: '5px solid black',
    color: 'rgba(31, 180, 255, 1)',
    backgroundColor: 'white',
    height: '100%'
  },
  buttoncontainer: {
    // border: '2px solid red'
  },
  button: {
    // width: '150px',
    // margin: '5px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '20',
    fontWeight: 'bold',
    margin: '10px auto'
    // alignItems: 'center',
    // justifyContent: 'center'
  }
};
