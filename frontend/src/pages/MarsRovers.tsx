import React from 'react';
import './MarsRovers.css';

const MarsRovers: React.FC = () => {
  return (
    <div className="mars-rovers">
      <h2>Mars Rover Missions</h2>
      <p>Explore the Red Planet through the eyes of our robotic explorers.</p>
      <div className="rover-cards">
        <div className="rover-card">
          <h3>Perseverance</h3>
          <p>Launched: July 30, 2020</p>
          <p>Landing: February 18, 2021</p>
          <p>Status: Active</p>
        </div>
        <div className="rover-card">
          <h3>Curiosity</h3>
          <p>Launched: November 26, 2011</p>
          <p>Landing: August 6, 2012</p>
          <p>Status: Active</p>
        </div>
        <div className="rover-card">
          <h3>Opportunity</h3>
          <p>Launched: July 7, 2003</p>
          <p>Landing: January 25, 2004</p>
          <p>Status: Mission Complete (2018)</p>
        </div>
        <div className="rover-card">
          <h3>Spirit</h3>
          <p>Launched: June 10, 2003</p>
          <p>Landing: January 4, 2004</p>
          <p>Status: Mission Complete (2010)</p>
        </div>
      </div>
    </div>
  );
};

export default MarsRovers;