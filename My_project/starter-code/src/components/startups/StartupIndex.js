import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Startup = ({ name, image, industry, country, date, id }) => {

  const link = (!!Auth.getCurrentUser()) ? `/startups/${id}` : "/login" ;

  return(
    <div>
      <img src={image} />
      <h1>{name}</h1>
      <p>{industry}</p>
      <p>{country}</p>
      <p>{date}</p>
      <Link to={link}>Show more...</Link>
    </div>
  );
};

export default Startup;
