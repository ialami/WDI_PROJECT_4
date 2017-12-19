import React from 'react';
import { withRouter } from 'react-router-dom';

const BackButton= ({ history }) => {
  return(
    <div style={styles.buttoncontainer}>
      <button
        className="btn btn-primary"
        style={styles.button}
        onClick={history.goBack}
      >
        Go back
      </button>
    </div>
  );
};

export default withRouter(BackButton);

const styles = {
  buttoncontainer: {
    // textAlign: 'center'
  },
  button: {
    width: '100px',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '10',
    fontWeight: 'bold'
  }
};
