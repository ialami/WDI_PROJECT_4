import React from 'react';
import { Row, Col, FormGroup, FormControl } from 'react-bootstrap';

const SearchBar = ({ handleSearch, handleSort }) => {
  return(
    <Row>
      <Col md={6}>
        <FormGroup>
          <FormControl
            componentClass="select"
            onChange={handleSort}
          >
            <option value="date|desc">Newest to oldest</option>
            <option value="date|asc">Oldest to newest</option>
          </FormControl>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <FormControl
            onChange={handleSearch}
            type="text"
            placeholder="Search by name"/>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <FormControl
            onChange={handleSearch}
            type="text"
            placeholder="Search by industry"/>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <FormControl
            onChange={handleSearch}
            type="text"
            placeholder="Search by country"/>
        </FormGroup>
      </Col>
    </Row>
  );
};

export default SearchBar;
