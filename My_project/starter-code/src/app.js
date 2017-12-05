import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Navbar from './components/utility/Navbar';
import Routes from './components/utility/Routes';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <header>
            <Navbar />
          </header>
          <main>
            <Routes />
          </main>
        </div>
      </Router>
    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
