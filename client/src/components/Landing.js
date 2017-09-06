import React from 'react';
import Background from '../img/people.jpg';

const Landing = () => {
  return (
    <div
      style={{
        textAlign: 'center'
        // backgroundImage: `url(${Background})`,
        // backgroundPosition: 'cover'
      }}
    >
      <h1>Feeback</h1>
      Collect feedback from your users to take your app to the next level
    </div>
  );
};

export default Landing;
