import React from 'react';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';

const Startup = ({ name, image, industry, country, date, founders, fundingtype, description, partnering, website, incubator, createdBy, id, deleteStartup }) => {
  return(
    <Grid fluid>
      <p>Created by: {createdBy}</p>
      <BackButton />
      <Row>
        <Col lg={8} md={8} ls={12}>
          <div style={styles.imagecontainer}>
            <Image
              src={image}
              style={styles.image}
            />
          </div>
          <h2 style={styles.titlename}>{name}</h2>
          <h2 style={styles.titledescription}>Description</h2>
          <p style={styles.description}>{description}</p>
          <h2 style={styles.titlepartnering}>Partnering strategy</h2>
          <p style={styles.partnering}>{partnering}</p>
        </Col>
        <Col style={styles.informationcontainer} lg={4} md={4} ls={12}>
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
            <p>{website}</p>
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
  imagecontainer: {
    height: '100px',
    width: '100%'
  },
  image: {
    height: '100px',
    margin: 'auto',
    display: 'flex'
  },
  titlename: {
    margin: '10px auto',
    textAlign: 'center'
  },
  titledescription: {

  },
  description: {
    marginBottom: '0',
    textAlign: 'justify',
    padding: '5px'
  },
  titlepartnering: {

  },
  partnering: {
    marginBottom: '0',
    textAlign: 'justify',
    padding: '5px'
  },
  information: {
    padding: '5px'
  },
  informationcontainer: {
    border: '5px solid black'
  },
  buttoncontainer: {
    border: '2px solid red'
  },
  button: {
    width: '150px',
    margin: '5px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
