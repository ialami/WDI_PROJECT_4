import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

const OurPartners = () => {
  return(
    <div>
      <h1 style={styles.partnersTitle}>
        OurPartners
      </h1>
      <hr style={styles.partnersBar}/>
      <Grid>
        <Row>
          <Col
            lg={4} md={4} xs={12}
            style={styles.flexbox}
          >
            <a href="http://www.hec.fr/Grande-Ecole-MS-MSc/Communication/Landing-Pages/HEC-Paris-rejoint-Station-F">
              <Image
                thumbnail responsive
                src="../../images/hec.png"
                style={styles.logoPartners}
              />
            </a>
          </Col>
          <Col
            lg={4} md={4} xs={12}
            style={styles.flexbox}
          >
            <a href="https://www.city.ac.uk/research/research-and-enterprise/getting-started/city-schemes/london-city-incubator">
              <Image
                thumbnail responsive
                src="../../images/city.png"
                style={styles.logoPartners}
              />
            </a>
          </Col>
          <Col
            lg={4} md={4} xs={12}
            style={styles.flexbox}
          >
            <a href="http://www.imperial.ac.uk/thinkspace/partners-and-services/imperial-white-city-incubator/">
              <Image
                thumbnail responsive
                src="../../images/imp.jpg"
                style={styles.logoPartners}
              />
            </a>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default OurPartners;

const styles = {
  partnersTitle: {
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    height: '100px',
    fontWeight: 'bold',
    fontSize: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0'
  },
  partnersBar: {
    width: '50%',
    height: '5px',
    border: '0',
    textAlign: 'center',
    marginBottom: '30px',
    marginTop: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  flexbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoPartners: {
    margin: 'auto',
    maxHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
