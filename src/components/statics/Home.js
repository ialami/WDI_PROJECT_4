import React from 'react';
import Mainscreen from './MainScreen';
import OurPartners from './OurPartners';
import { Grid, Row, Col } from 'react-bootstrap';

const Home = () => {
  return(
    <Grid fluid
      style={styles.container}
    >
      <Row>
        <Col
          lg={12} md={12} xs={12}
          style={styles.mainScreen}
        >
          <Mainscreen />
        </Col>
      </Row>
      {/* <Row>
        <Col
          lg={12} md={12} xs={12}
          style={styles.partners}>
          <OurPartners />
        </Col>
      </Row> */}
    </Grid>
  );
};

export default Home;

const styles = {
  container: {
    // border: '5px solid green',
    position: 'relative',
    // background: `url(`../../images/imagetwo.jpg`) no-repeat center center fixed`,
    backgroundSize: 'cover',
    height: '100vh',
    // backgroundColor: '#1e90ff',
    backgroundColor: 'rgba(31, 180, 255, 1)',
    color: 'white'
  },
  mainScreen: {
    // border: '3px solid red',
    width: '100%',
    height: '100vh'
  },
  partners: {
    width: '100%',
    height: '400px'
  }
};
