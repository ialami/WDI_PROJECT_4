import React from 'react';

const StartupsForm = ({ handleChange, handleSubmit, startup, errors }) => {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return(
    <div>
      <form
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter start-up name"
            value={startup.name}
            onChange={handleChange}
          />
          {errors.name && <small>{errors.name}</small>}
        </div>
        <div>
          <input
            type="text"
            id="date"
            name="date"
            placeholder="Enter year"
            value={startup.date}
            onChange={handleChange}
          />
          {errors.date && <small>{errors.date}</small>}
        </div>
        <div>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Enter country"
            value={startup.country}
            onChange={handleChange}
          />
          {errors.country && <small>{errors.country}</small>}
        </div>
        <div>
          <input
            type="text"
            id="industry"
            name="industry"
            placeholder="Enter industry"
            value={startup.industry}
            onChange={handleChange}
          />
          {errors.industry && <small>{errors.industry}</small>}
        </div>
        <div>
          <input
            type="text"
            id="founders"
            name="founders"
            placeholder="Enter founders"
            value={startup.founders}
            onChange={handleChange}
          />
          {errors.founders && <small>{errors.founders}</small>}
        </div>
        <div>
          <input
            type="text"
            id="incubator"
            name="incubator"
            placeholder="Enter incubator"
            value={startup.incubator}
            onChange={handleChange}
          />
          {errors.incubator && <small>{errors.incubator}</small>}
        </div>
        <div>
          <input
            type="text"
            id="website"
            name="website"
            placeholder="Enter website url"
            value={startup.website}
            onChange={handleChange}
          />
          {errors.website && <small>{errors.website}</small>}
        </div>
        <div>
          <input
            type="text"
            id="partnering"
            name="partnering"
            placeholder="Enter partnering"
            value={startup.partnering}
            onChange={handleChange}
          />
          {errors.partnering && <small>{errors.partnering}</small>}
        </div>
        <div>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter description"
            value={startup.description}
            onChange={handleChange}
          />
          {errors.description && <small>{errors.description}</small>}
        </div>
        <div>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Enter image url"
            value={startup.image}
            onChange={handleChange}
          />
          {errors.image && <small>{errors.image}</small>}
        </div>
        <div>
          <input
            type="text"
            id="fundingtype"
            name="fundingtype"
            placeholder="Enter funding stage"
            value={startup.fundingtype}
            onChange={handleChange}
          />
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
        <div>
          <button disabled={formInvalid}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default StartupsForm;
