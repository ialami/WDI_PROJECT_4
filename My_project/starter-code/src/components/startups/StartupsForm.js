import React from 'react';
import { FormControl, FormGroup, Button } from 'react-bootstrap';
import BackButton from '../utility/BackButton';

const StartupsForm = ({ handleChange, handleSubmit, startup, errors }) => {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return(
    <form
      onSubmit={handleSubmit}
      style={styles.container}
    >  
      <BackButton />
      <FormGroup
      >
        <FormControl
          type="text"
          id="name"
          name="name"
          placeholder="Enter start-up name"
          value={startup.name}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.error}>
          {errors.name && <small>{errors.name}</small>}
        </div>
        <FormControl
          type="text"
          id="date"
          name="date"
          placeholder="Enter year"
          value={startup.date}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.error}>
          {errors.date && <small>{errors.date}</small>}
        </div>
        <FormControl
          type="text"
          id="country"
          name="country"
          placeholder="Enter country"
          value={startup.country}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.error}>
          {errors.country && <small>{errors.country}</small>}
        </div>
        <FormControl
          type="text"
          id="industry"
          name="industry"
          placeholder="Enter industry"
          value={startup.industry}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.error}>
          {errors.industry && <small>{errors.industry}</small>}
        </div>
        <FormControl
          type="text"
          id="founders"
          name="founders"
          placeholder="Enter founders"
          value={startup.founders}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.error}>
          {errors.founders && <small>{errors.founders}</small>}
        </div>
        <FormControl
          type="text"
          id="incubator"
          name="incubator"
          placeholder="Enter incubator"
          value={startup.incubator}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.error}>
          {errors.incubator && <small>{errors.incubator}</small>}
        </div>
        <FormControl
          type="text"
          id="website"
          name="website"
          placeholder="Enter website URL"
          value={startup.website}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.error}>
          {errors.website && <small>{errors.website}</small>}
        </div>
        <FormControl
          type="text"
          id="partnering"
          name="partnering"
          placeholder="Enter partnering strategy"
          value={startup.partnering}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.error}>
          {errors.partnering && <small>{errors.partnering}</small>}
        </div>
        <FormControl
          type="text"
          id="description"
          name="description"
          placeholder="Enter description"
          value={startup.description}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.error}>
          {errors.description && <small>{errors.description}</small>}
        </div>
        <FormControl
          type="text"
          id="image"
          name="image"
          placeholder="Enter image url"
          value={startup.image}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.error}>
          {errors.image && <small>{errors.image}</small>}
        </div>
        <FormControl
          type="text"
          id="fundingtype"
          name="fundingtype"
          placeholder="Enter funding stage"
          value={startup.fundingtype}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.error}>
          {errors.fundingtype && <small>{errors.fundingtype}</small>}
        </div>
        {/* <div>
          <select
            name="fundingtype"
            value={startup.fundingtype}
          >
            <option value={startup.fundingtype} name="fundingtype">
              Bootstrapping
            </option>
            <option value={startup.fundingtype} name="fundingtype">
              Seed capital
            </option>
            <option value={startup.fundingtype} name="fundingtype">
              series A
            </option>
            <option value={startup.fundingtype} name="fundingtype">
              series B
            </option>
            <option value={startup.fundingtype} name="fundingtype">
              series C
            </option>
            <option value={startup.fundingtype} name="fundingtype">
              Initial Public Offering
            </option>
            <option default disabled>
              Funding stage
            </option>
          </select>
        </div> */}
        <div style={styles.buttoncontainer}>
          <button
            disabled={formInvalid}
            className="btn btn-primary"
            style={styles.button}
          >
            Add
          </button>
        </div>
      </FormGroup>
    </form>
  );
};

export default StartupsForm;

const styles = {
  container: {
    border: '5px solid blue',
    height: '100vh'
  },
  title: {
    // border: '2px solid black',
    textAlign: 'center',
    margin: '10px 0'
  },
  input: {
    margin: '15px auto',
    width: '400px',
    textAlign: 'center'
  },
  buttoncontainer: {
    textAlign: 'center'
  },
  button: {
    width: '400px'
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: '-5'
  }
};
