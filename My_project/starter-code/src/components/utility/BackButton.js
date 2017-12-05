import React from 'react';
import { withRouter } from 'react-router-dom';

const BackButton= ({ history }) => {
  return(
    <button onClick={history.goBack}>
      Go back
    </button>
  );
};

export default withRouter(BackButton);
