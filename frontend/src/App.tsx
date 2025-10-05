import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ApodComponent from './components/Apod';
import MarsRovers from './pages/MarsRovers';
import Missions from './pages/Missions';
import './App.css';

// Simple component for the games page
const GamesPage: React.FC = () => {
  return (
    <div className="games-page">
      <header className="App-header">
        <h1>Cosmic Games</h1>
        <p>Explore our collection of space-themed games</p>
        <div className="games-container">
          <div className="game-card" onClick={() => window.location.href = '/src/games/index.html'}>
            <h3>Space Explorer</h3>
            <p>Control an astronaut exploring space and visiting planets</p>
          </div>
        </div>
      </header>
    </div>
  );
};

function App() {
  const spaceRef = useRef<HTMLDivElement>(null);
  const astronautRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create stars
    const createStars = () => {
      if (!spaceRef.current) return;
      
      // Clear existing stars
      const existingStars = spaceRef.current.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());
      
      // Create new stars
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
        star.style.setProperty('--duration', `${Math.random() * 5 + 2}s`);
        spaceRef.current.appendChild(star);
      }
    };

    // Create planets
    const createPlanets = () => {
      if (!spaceRef.current) return;
      
      // Clear existing planets
      const existingPlanets = spaceRef.current.querySelectorAll('.planet');
      existingPlanets.forEach(planet => planet.remove());
      
      // Create planets
      for (let i = 0; i < 5; i++) {
        const planet = document.createElement('div');
        planet.className = 'planet';
        planet.style.left = `${Math.random() * 100}%`;
        planet.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 100 + 50;
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;
        planet.style.setProperty('--duration', `${Math.random() * 30 + 20}s`);
        
        // Random planet colors
        const colors = [
          'radial-gradient(circle at 30% 30%, #ff6b6b, #c44545)',
          'radial-gradient(circle at 30% 30%, #4ecdc4, #2a9d8f)',
          'radial-gradient(circle at 30% 30%, #ffd166, #e9c46a)',
          'radial-gradient(circle at 30% 30%, #6a0572, #9d4edd)',
          'radial-gradient(circle at 30% 30%, #118ab2, #073b4c)'
        ];
        planet.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        spaceRef.current.appendChild(planet);
      }
    };

    // Create satellites
    const createSatellites = () => {
      if (!spaceRef.current) return;
      
      // Clear existing satellites
      const existingSatellites = spaceRef.current.querySelectorAll('.satellite');
      existingSatellites.forEach(satellite => satellite.remove());
      
      // Create satellites
      for (let i = 0; i < 3; i++) {
        const satellite = document.createElement('div');
        satellite.className = 'satellite';
        satellite.style.top = '50%';
        satellite.style.left = '50%';
        satellite.style.setProperty('--radius', `${Math.random() * 300 + 200}px`);
        satellite.style.setProperty('--duration', `${Math.random() * 40 + 30}s`);
        spaceRef.current.appendChild(satellite);
      }
    };

    // Create interactive planets
    const createInteractivePlanets = () => {
      if (!spaceRef.current) return;
      
      // Clear existing interactive planets
      const existingPlanets = spaceRef.current.querySelectorAll('.interactive-planet');
      existingPlanets.forEach(planet => planet.remove());
      
      // Create interactive planets
      for (let i = 0; i < 3; i++) {
        const planet = document.createElement('div');
        planet.className = 'interactive-planet';
        planet.style.left = `${Math.random() * 80 + 10}%`;
        planet.style.top = `${Math.random() * 80 + 10}%`;
        const size = Math.random() * 60 + 40;
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;
        
        // Random planet colors
        const colors = [
          'radial-gradient(circle at 30% 30%, #ff9a8b, #ff6b6b)',
          'radial-gradient(circle at 30% 30%, #7bffcb, #4ecdc4)',
          'radial-gradient(circle at 30% 30%, #ffde7d, #ffd166)'
        ];
        planet.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Add click event
        planet.addEventListener('click', function() {
          // Create info box
          let infoBox = this.querySelector('.planet-info');
          if (!infoBox) {
            infoBox = document.createElement('div');
            infoBox.className = 'planet-info';
            
            const planetNames = ['Mars', 'Jupiter', 'Saturn'];
            const planetFacts = [
              'The Red Planet has the largest volcano in the solar system.',
              'Jupiter is more than twice as massive as all the other planets combined.',
              'Saturn has 82 known moons, with Titan being the largest.'
            ];
            
            const name = planetNames[Math.floor(Math.random() * planetNames.length)];
            const fact = planetFacts[Math.floor(Math.random() * planetFacts.length)];
            
            infoBox.innerHTML = `
              <h3>${name}</h3>
              <p>${fact}</p>
            `;
            
            this.appendChild(infoBox);
          }
          
          // Toggle visibility
          infoBox.classList.toggle('visible');
        });
        
        spaceRef.current.appendChild(planet);
      }
    };

    // Initialize space elements
    createStars();
    createPlanets();
    createSatellites();
    createInteractivePlanets();

    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!astronautRef.current) return;
      
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      
      astronautRef.current.style.transform = `translate(calc(-50% + ${xAxis}px), calc(-50% + ${yAxis}px))`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Space background elements */}
        <div className="space-background" ref={spaceRef}></div>
        
        {/* Floating astronaut */}
        <div className="astronaut-container" ref={astronautRef}>
          <div className="astronaut">
            <div className="astronaut-helmet"></div>
            <div className="astronaut-body"></div>
            <div className="astronaut-backpack"></div>
            <div className="astronaut-jetpack"></div>
          </div>
        </div>
        
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <header className="App-header">
                <h1>Cosmic Explorer</h1>
                <p>Journey through the cosmos with our interactive space experience</p>
                <p>Click on the glowing planets to discover space facts!</p>
              </header>
            } />
            <Route path="/apod" element={<ApodComponent />} />
            <Route path="/mars" element={<MarsRovers />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/games" element={<GamesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;