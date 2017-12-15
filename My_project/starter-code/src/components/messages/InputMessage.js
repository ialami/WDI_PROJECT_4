import React from 'react';
import { FormControl, FormGroup, Button } from 'react-bootstrap';

const InputMessage = ({ handleChange, handleSubmit, message }) => {
  return(
    <form
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <FormControl
          type="text"
          id="content"
          name="content"
          placeholder="Send a message"
          onChange={handleChange}
          value={message.content}
          // style={styles.input}
        />
        <button
          className="btn btn-primary"
          // style={styles.button}
        >
          Send
        </button>
      </FormGroup>
    </form>
  );
};

export default InputMessage;
