import React from 'react';
import { Link } from 'react-router-dom';

const Startup = ({ name, image, industry, country, date, id }) => {
  return(
    <div>
      <img src={image} />
      <h1>{name}</h1>
      <p>{industry}</p>
      <p>{country}</p>
      <p>{date}</p>
      <Link to={`/startups/${id}`}>Show more...</Link>
    </div>
  );
};

export default Startup;
