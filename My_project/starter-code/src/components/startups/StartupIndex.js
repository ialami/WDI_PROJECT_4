import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import { Thumbnail, Image } from 'react-bootstrap';

const Startup = ({ image, industry, country, date, id }) => {

  const link = (!!Auth.getCurrentUser()) ? `/startups/${id}` : "/login" ;
  console.log(link);
  return(
    <div>
      <Thumbnail
        style={styles.logo}
      >
        <div style={styles.imagecontainer}>
          <Image src={image} style={styles.image}/>
        </div>
        <p style={styles.center}>{industry}</p>
        <p style={styles.country} className="text-truncate">{country}</p>
        <p style={styles.center}>{date}</p>
        <Link to={link} style={styles.seemore}>See more...</Link>
      </Thumbnail>
    </div>
  );
};

export default Startup;

const styles = {
  logo: {
    border: '3px solid black',
    padding: '0',
    margin: '10',
    width: '100%',
    height: '200px'
  },
  center: {
    textAlign: 'center',
    margin: '10px'
  },
  country: {
    textAlign: 'center',
    margin: '10px'
    // maxWidth: '100px'
  },
  column: {
    paddingRight: '0',
    paddingLeft: '0'
  },
  image: {
    maxHeight: '50px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagecontainer: {
    height: '50px',
    width: '100%'
    // border: '2px solid blue'
  },
  seemore: {
    margin: 'auto 0',
    marginBottom: '10px'
  }
};
