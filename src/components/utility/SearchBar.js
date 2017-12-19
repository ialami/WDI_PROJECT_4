import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap';

const SearchBar = ({ handleSearch, handleSort }) => {
  return(
    <Grid fluid>
      <Row style={styles.container}>
        <Col md={3}>
          <FormGroup>
            <FormControl
              componentClass="select"
              onChange={handleSort}
              style={styles.formcontrol}
            >
              <option value="date|desc">Newest to oldest</option>
              <option value="date|asc">Oldest to newest</option>
            </FormControl>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <FormControl
              onChange={handleSearch}
              type="text"
              placeholder="Search by name"/>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <FormControl
              onChange={handleSearch}
              type="text"
              placeholder="Search by industry"/>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <FormControl
              onChange={handleSearch}
              type="text"
              placeholder="Search by country"/>
          </FormGroup>
        </Col>
      </Row>
    </Grid>
  );
};

export default SearchBar;

const styles = {
  container: {
    // margin: '0 10px'
  },
  formcontrol: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
