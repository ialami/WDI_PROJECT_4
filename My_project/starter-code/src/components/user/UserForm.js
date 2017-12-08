import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const UserForm = ({ handleChange, handleSubmit, user, switchBoolean }) => {

  return(
    <div>
      <form
        onSubmit={handleSubmit}
      >
        <FormGroup
          // controlId="formBasicText"
          // validationState={handleSubmit}
          onSubmit={handleSubmit}
        >
          <FormControl
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Edit full name"
            value={user.fullName}
            // value={boolean}
            onChange={handleChange}
          />
          <FormControl
            type="text"
            id="username"
            name="username"
            placeholder="Edit username"
            value={user.username}
            onChange={handleChange}
          />
          <FormControl
            type="text"
            id="email"
            name="email"
            placeholder="Edit email"
            value={user.email}
            onChange={handleChange}
          />
          <button
            onClick={switchBoolean}
            className="btn btn-primary"
          >
            Save
          </button>
        </FormGroup>
      </form>
    </div>
  );
};

export default UserForm;

// {/* <form>
//   <FormGroup
//     controlId="formBasicText"
//     validationState={this.getValidationState()}
//   >
//     <ControlLabel>Working example with validation</ControlLabel>
//     <FormControl
//       type="text"
//       value={this.state.value}
//       placeholder="Enter text"
//       onChange={this.handleChange}
//     />
//     <FormControl.Feedback />
//     <HelpBlock>Validation is based on string length.</HelpBlock>
//   </FormGroup>
// </form> */}
