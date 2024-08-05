import React from 'react';
import './Feature.css';

function Feature() {
  return (
    <section className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        <div className="feature-item">
          <img src='./location.png' alt="Location" />
          <h1>Location-Based Provided</h1>
          <span className='secondaryText'> Users can find properties based on specific locations, helping them discover suitable properties within their desired areas.</span>
        </div>
        <div className="feature-item">
          <img src='./price.png' alt="Price" />
          <h1 >Price Estimation</h1>
          <span className='secondaryText'>Users can estimate property prices by providing details such as total square feet, number of bathrooms, and number of bedrooms.</span>
        </div>
        <div className="feature-item">
          <img src='./listing.png' alt="Listing" />
          <h1>Statistics Display</h1>
          <span className='secondaryText'>The website shows real-time statistics such as the total number of properties and places available, providing users with an overview of the market.</span>
        </div>
      </div>
    </section>
  );
}

export default Feature;
