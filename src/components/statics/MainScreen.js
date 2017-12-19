import React from 'react';
import MainScreenButtons from './MainScreenButtons';
import { Grid, Row, Col } from 'react-bootstrap';

const MainScreen = () => {
  return(
    <Grid>
      <Row>
        <Col
          xs={12} md={12} lg={12}
          style={styles.homepageText}
        >
          <h1 style={styles.header}>New partners, new opportunities ...</h1>
          <h2 style={styles.subheader}>Develop your business and partner with start-ups all over the world</h2>
          <MainScreenButtons />
        </Col>
      </Row>
    </Grid>
  );
};

export default MainScreen;

const styles = {
  homepageText: {
    width: '100%',
    height: '500px',
    position: 'absolute',
    margin: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '100px',
    fontWeight: 'bold',
    borderRadius: '10px'
    // padding: '20px'
    // color: 'white'
  },
  header: {
    textAlign: 'center',
    fontSize: '80px',
    fontWeight: 'bold'
  },
  subheader: {
    margin: '30px',
    textAlign: 'center',
    fontWeight: '500'
  }
};
