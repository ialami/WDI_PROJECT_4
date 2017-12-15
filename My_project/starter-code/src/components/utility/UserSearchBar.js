import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap';

const UserSearchBar = ({ handleSearch }) => {
  return(
    <FormGroup>
      <FormControl
        onChange={handleSearch}
        type="text"
        placeholder="Search by user"/>
    </FormGroup>
  )
}

export default UserSearchBar;
