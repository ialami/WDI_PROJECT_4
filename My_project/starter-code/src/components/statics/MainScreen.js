import React from 'react';
import MainScreenButtons from './MainScreenButtons';

const MainScreen = () => {
  return(
    <div style={styles.homepageText}>
      <h1 style={styles.header}>New partners, new opportunities ...</h1>
      <h2 style={styles.subheader}>Develop your business and partner with start-ups all over the world</h2>
      <MainScreenButtons />
    </div>
  );
};

export default MainScreen;

const styles = {
  homepageText: {
    width: '1000px',
    height: '500px',
    position: 'absolute',
    margin: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '100px',
    fontWeight: 'bold',
    borderRadius: '10px',
    padding: '20px'
    // color: 'white'
  },
  header: {
    textAlign: 'center',
    fontSize: '80px',
    fontWeight: 'bold'
  },
  subheader: {
    margin: '30px',
    textAlign: 'center',
    fontWeight: '500'
  }
};
