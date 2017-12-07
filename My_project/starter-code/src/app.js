import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigationbar from './components/utility/Navbar';
import Routes from './components/utility/Routes';
import './scss/debug.scss';
import './scss/reset.scss';
import 'bootstrap-css-only';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container-fluid"
          // style={styles.container}
        >
          <header className="row"
            // style={styles.navBar}
          >
            <Navigationbar />
          </header>
          <main className="row"
            // style={styles.main}
          >
            <Routes />
          </main>
        </div>
      </Router>
    );
  }

}

const styles = {
  container: {
    border: '5px solid red'
  },
  navBar: {
    border: '5px solid blue'
  },
  main: {
    border: '5px solid green'
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
