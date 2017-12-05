import React from 'react';

const Startup = ({ name, image, industry, country, date, founders, fundingtype, description, partnering, website, incubator, createdBy }) => {
  return(
    <div>
      <img src={image} />
      <h1>Name: {name}</h1>
      <p>Industry: {industry}</p>
      <p>Country: {country}</p>
      <p>Date: {date}</p>
      <p>Founders: {founders}</p>
      <p>Funding stage: {fundingtype}</p>
      <p>Description: {description}</p>
      <p>Partnering startegy: {partnering}</p>
      <p>Website: {website}</p>
      <p>Incubator: {incubator}</p>
      <p>Created by: {createdBy}</p>
    </div>
  );
};

export default Startup;
