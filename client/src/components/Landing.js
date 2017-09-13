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
      Collect feedback from your users to take your app to the next level!
      <div>
        <p>
          Simply login with Google, and then discover how your customers feel
          about you and your product!
        </p>
      </div>
    </div>
  );
};

export default Landing;
