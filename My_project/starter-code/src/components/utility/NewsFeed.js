import React from 'react';

const NewsFeed = () => {
  return(
    <div style={styles.container}>
      <h3 style={styles.news}>News Feed</h3>
    </div>
  );
};

export default NewsFeed;

const styles = {
  container: {
    border: '3px solid yellow'
  },
  news: {
    margin: 0,
    textAlign: 'center'
  }
};
