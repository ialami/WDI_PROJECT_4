import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Startup = ({ name, image, industry, country, date, id, createdBy, deleteStartup }) => {
  return(
    <div>
      <img src={image} />
      <h1>{name}</h1>
      <p>{industry}</p>
      <p>{country}</p>
      <p>{date}</p>
      <p>id: {id}</p>
      <p>createdBy: {createdBy}</p>
      <p> Auth get current user: {Auth.getCurrentUser()} </p>
      <Link to={`/startups/${id}`}>Show more...</Link>
      { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <Link to={`/startups/${id}/edit`}>
        <p>Edit</p>
      </Link> }
      {' '}
      { ( Auth.isAuthenticated() && ( Auth.getCurrentUser() === createdBy ) ) && <button
        onClick={deleteStartup}
        value={id}
      >
        Delete
      </button> }
    </div>
  );
};

export default Startup;
