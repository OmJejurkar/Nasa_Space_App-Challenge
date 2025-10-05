import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">Cosmic Explorer</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/apod">APOD</Link></li>
        <li><Link to="/mars">Mars Rovers</Link></li>
        <li><Link to="/missions">Missions</Link></li>
        <li><Link to="/games">Games</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;