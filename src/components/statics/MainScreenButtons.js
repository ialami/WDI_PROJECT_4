import React from 'react';
import Auth from '../../lib/Auth';
import { ButtonToolbar, Button  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MainScreenButtons = () => {
  return(
    <div style={styles.buttonsBox}>
      <ButtonToolbar>
        { Auth.isAuthenticated() && <LinkContainer to="/startups" style={styles.explore}>
          <Button bsSize="large">
            Explore start-ups
          </Button>
        </LinkContainer>
        }
        { !Auth.isAuthenticated() && <LinkContainer to="/login" style={styles.login}>
          <Button bsSize="large">
            Login
          </Button>
        </LinkContainer>
        }
        { !Auth.isAuthenticated() && <LinkContainer to="/register" style={styles.register}>
          <Button bsSize="large">
            Register
          </Button>
        </LinkContainer>
        }
      </ButtonToolbar>
    </div>
  );
};

export default MainScreenButtons;

const styles = {
  buttonsBox: {
    width: '50%',
    margin: 'auto'
  },
  explore: {
    width: '500px',
    borderRadius: '5px',
    fontSize: '40px',
    margin: '10px auto',
    display: 'block',
    fontWeight: 'bolder'
  },
  login: {
    width: '200px',
    borderRadius: '5px',
    fontSize: '30px',
    margin: '10px auto',
    display: 'block',
    fontWeight: 'bold'

  },
  register: {
    width: '200px',
    borderRadius: '5px',
    fontSize: '30px',
    margin: '10px auto',
    display: 'block',
    fontWeight: 'bold',
    float: 'right'
  }
};
