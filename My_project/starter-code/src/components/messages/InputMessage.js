import React from 'react';
import { FormControl, FormGroup, Button, Grid, Row, Col } from 'react-bootstrap';

const InputMessage = ({ handleChange, handleSubmit, message }) => {
  return(
    <Grid fluid>
      <form
        onSubmit={handleSubmit}
      >
        <Row style={styles.row}>
          <FormGroup>
            <Col lg={9} md={9} sm={9}>
              <FormControl
                type="text"
                id="content"
                name="content"
                placeholder="Send a message"
                onChange={handleChange}
                value={message.content}
                style={styles.input}
              />
            </Col>
            <Col lg={3} md={3} sm={3}>
              <div style={styles.buttoncontainer}>
                <button
                  className="btn btn-primary"
                  style={styles.button}
                >
                  Send
                </button>
              </div>
            </Col>
          </FormGroup>
        </Row>
      </form>
    </Grid>
  );
};

export default InputMessage;

const styles = {
  buttoncontainer: {
    // textAlign: 'center'
  },
  button: {
    // margin: '10px',
    width: '100px',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '15',
    fontWeight: 'bold',
    padding: '10px'
  },
  row: {
    // marginTop: '10px'
  },
  input: {
    margin: 'auto',
    // width: '400px',
    // textAlign: 'center',
    padding: '20px',
    borderTop: '2px solid black'
  }
};
