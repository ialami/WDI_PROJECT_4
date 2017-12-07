import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigationbar from './components/utility/Navbar';
import Routes from './components/utility/Routes';
import NewsFeed from './components/utility/NewsFeed';
import AdsBar from './components/utility/AdsBar';
import './scss/debug.scss';
import './scss/reset.scss';
import 'bootstrap-css-only';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {

  render() {
    return (
      <Router>
        <Grid fluid
          style={styles.container}
        >
          <Row
            style={styles.header}
          >
            <Navigationbar/>
            <NewsFeed />
          </Row>
          <Row
            style={styles.main}
          >
            <Col
              style={styles.ads}
              xs={2} md={2} lg={2}
            >
              <AdsBar />
            </Col>
            <Col
              xs={10} md={10} lg={10}
              style={styles.routes}
            >
              <Routes />
            </Col>
          </Row>
        </Grid>
      </Router>
    );
  }

}

const styles = {
  container: {
    border: '5px solid green'
  },
  header: {
    border: '5px solid pink'
  },
  main: {
    border: '5px solid yellow'
  },
  ads: {
    // float: 'left',
    height: '100vh',
    border: '5px solid red'
  },
  routes: {
    // float: 'right',
    paddingLeft: '0px',
    paddingRight: '0px'
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
