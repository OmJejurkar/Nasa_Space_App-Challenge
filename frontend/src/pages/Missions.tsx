import React from 'react';
import './Missions.css';

const Missions: React.FC = () => {
  return (
    <div className="missions">
      <h2>NASA Missions</h2>
      <p>Discover the incredible missions that have expanded our understanding of the universe.</p>
      <div className="mission-list">
        <div className="mission-card">
          <h3>Artemis Program</h3>
          <p>Returning humans to the Moon and preparing for future Mars missions.</p>
        </div>
        <div className="mission-card">
          <h3>James Webb Space Telescope</h3>
          <p>Exploring the universe with the most powerful space telescope ever built.</p>
        </div>
        <div className="mission-card">
          <h3>Hubble Space Telescope</h3>
          <p>Revolutionizing our understanding of the cosmos for over 30 years.</p>
        </div>
        <div className="mission-card">
          <h3>Voyager Program</h3>
          <p>Exploring the outer reaches of our solar system and beyond.</p>
        </div>
      </div>
    </div>
  );
};

export default Missions;