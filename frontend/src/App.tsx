import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
          <div className="game-card" onClick={() => window.location.href = '/games/SpaceExplorer/index.html'}>
            <div className="game-icon explorer-icon">🚀</div>
            <h3>Space Explorer</h3>
            <p>Control an astronaut exploring space and visiting planets</p>
            <button className="play-btn">Play Now</button>
          </div>
          <div className="game-card" onClick={() => window.location.href = '/games/GalaxyDefender/index.html'}>
            <div className="game-icon defender-icon">🔫</div>
            <h3>Galaxy Defender</h3>
            <p>Defend the galaxy against incoming asteroids and alien ships</p>
            <button className="play-btn">Play Now</button>
          </div>
          <div className="game-card" onClick={() => window.location.href = '/games/PlanetBuilder/index.html'}>
            <div className="game-icon builder-icon">🌍</div>
            <h3>Planet Builder</h3>
            <p>Create and customize your own planets with unique ecosystems</p>
            <button className="play-btn">Play Now</button>
          </div>
        </div>
      </header>
    </div>
  );
};

// Interactive Planet Component
const InteractivePlanet: React.FC<{ 
  name: string, 
  fact: string, 
  onClick: () => void,
  position: { left: string, top: string },
  size: string,
  color: string
}> = ({ name, fact, onClick, position, size, color }) => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <div 
      className="interactive-planet" 
      style={{ 
        left: position.left, 
        top: position.top, 
        width: size, 
        height: size,
        background: color
      }}
      onClick={onClick}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      {showInfo && (
        <div className="planet-info visible">
          <h3>{name}</h3>
          <p>{fact}</p>
        </div>
      )}
    </div>
  );
};

// Holographic Control Panel Component
const ControlPanel: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="control-panel">
      <div className="panel-header">
        <h2>Mission Control</h2>
      </div>
      <div className="panel-buttons">
        <button className="control-btn" onClick={() => navigate('/')}>
          <span className="btn-icon">🌌</span>
          <span className="btn-text">Explore Planets</span>
        </button>
        <button className="control-btn" onClick={() => navigate('/apod')}>
          <span className="btn-icon">🌠</span>
          <span className="btn-text">NASA Feed</span>
        </button>
        <button className="control-btn" onClick={() => navigate('/games')}>
          <span className="btn-icon">🎮</span>
          <span className="btn-text">Play Game</span>
        </button>
        <button className="control-btn" onClick={() => navigate('/mars')}>
          <span className="btn-icon">🔴</span>
          <span className="btn-text">Mars Rovers</span>
        </button>
        <button className="control-btn" onClick={() => navigate('/missions')}>
          <span className="btn-icon">🚀</span>
          <span className="btn-text">Missions</span>
        </button>
      </div>
    </div>
  );
};

// Launch Mission Button Component
const LaunchMissionButton: React.FC = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (countdown !== null) return;
    
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          // Add screen shake effect
          document.body.classList.add('shake');
          setTimeout(() => {
            document.body.classList.remove('shake');
            navigate('/games');
          }, 500);
          return 0;
        }
        return prev ? prev - 1 : 0;
      });
    }, 1000);
  };
  
  return (
    <button 
      className={`launch-btn ${countdown !== null ? 'countdown' : ''}`} 
      onClick={handleClick}
    >
      {countdown !== null ? (
        <span className="countdown-text">{countdown}</span>
      ) : (
        <span className="launch-text">Launch Mission</span>
      )}
    </button>
  );
};

// Main Homepage Component
const Homepage: React.FC = () => {
  const navigate = useNavigate();
  
  // Planet data
  const planets = [
    {
      name: "Mars",
      fact: "The Red Planet has the largest volcano in the solar system.",
      position: { left: "15%", top: "25%" },
      size: "70px",
      color: "radial-gradient(circle at 30% 30%, #ff9a8b, #ff6b6b)"
    },
    {
      name: "Jupiter",
      fact: "Jupiter is more than twice as massive as all the other planets combined.",
      position: { left: "75%", top: "20%" },
      size: "100px",
      color: "radial-gradient(circle at 30% 30%, #7bffcb, #4ecdc4)"
    },
    {
      name: "Saturn",
      fact: "Saturn has 82 known moons, with Titan being the largest.",
      position: { left: "20%", top: "70%" },
      size: "90px",
      color: "radial-gradient(circle at 30% 30%, #ffde7d, #ffd166)"
    },
    {
      name: "Neptune",
      fact: "Neptune has the strongest winds in the solar system, reaching 2,100 km/h.",
      position: { left: "80%", top: "65%" },
      size: "80px",
      color: "radial-gradient(circle at 30% 30%, #a0d2eb, #5fa8d3)"
    }
  ];
  
  return (
    <div className="homepage">
      <div className="homepage-content">
        <div className="intro-text">
          <h1 className="main-title">
            <span className="title-line">In a universe of data</span>
            <span className="title-line">and discovery...</span>
          </h1>
          <p className="subtitle">Journey through the cosmos with our interactive space experience</p>
        </div>
        
        <div className="homepage-planets">
          {planets.map((planet, index) => (
            <InteractivePlanet
              key={index}
              name={planet.name}
              fact={planet.fact}
              position={planet.position}
              size={planet.size}
              color={planet.color}
              onClick={() => navigate('/missions')}
            />
          ))}
        </div>
        
        <ControlPanel />
        
        <div className="homepage-footer">
          <LaunchMissionButton />
          <p className="click-hint">Click on planets to discover space facts!</p>
        </div>
      </div>
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
      
      // Create new stars with multiple layers for parallax effect
      for (let layer = 0; layer < 3; layer++) {
        const starCount = layer === 0 ? 100 : layer === 1 ? 70 : 50;
        const size = layer === 0 ? 1 : layer === 1 ? 2 : 3;
        const opacity = layer === 0 ? 0.8 : layer === 1 ? 0.5 : 0.3;
        
        for (let i = 0; i < starCount; i++) {
          const star = document.createElement('div');
          star.className = `star star-layer-${layer}`;
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          star.style.opacity = `${Math.random() * opacity + 0.1}`;
          star.style.setProperty('--duration', `${Math.random() * 5 + 2}s`);
          spaceRef.current.appendChild(star);
        }
      }
    };

    // Create planets
    const createPlanets = () => {
      if (!spaceRef.current) return;
      
      // Clear existing planets
      const existingPlanets = spaceRef.current.querySelectorAll('.planet');
      existingPlanets.forEach(planet => planet.remove());
      
      // Create background planets
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
        satellite.style.top = `${Math.random() * 100}%`;
        satellite.style.left = `${Math.random() * 100}%`;
        satellite.style.setProperty('--radius', `${Math.random() * 200 + 100}px`);
        satellite.style.setProperty('--duration', `${Math.random() * 40 + 30}s`);
        spaceRef.current.appendChild(satellite);
      }
    };

    // Create space debris
    const createDebris = () => {
      if (!spaceRef.current) return;
      
      // Clear existing debris
      const existingDebris = spaceRef.current.querySelectorAll('.debris');
      existingDebris.forEach(debris => debris.remove());
      
      // Create space debris
      for (let i = 0; i < 8; i++) {
        const debris = document.createElement('div');
        debris.className = 'debris';
        debris.style.left = `${Math.random() * 100}%`;
        debris.style.top = `${Math.random() * 100}%`;
        debris.style.width = `${Math.random() * 8 + 2}px`;
        debris.style.height = debris.style.width;
        debris.style.setProperty('--duration', `${Math.random() * 30 + 20}s`);
        debris.style.setProperty('--direction', `${Math.random() * 360}deg`);
        spaceRef.current.appendChild(debris);
      }
    };

    // Initialize space elements
    createStars();
    createPlanets();
    createSatellites();
    createDebris();

    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!spaceRef.current) return;
      
      // Parallax effect for different layers
      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
      
      const starsLayer0 = spaceRef.current.querySelectorAll('.star-layer-0');
      const starsLayer1 = spaceRef.current.querySelectorAll('.star-layer-1');
      const starsLayer2 = spaceRef.current.querySelectorAll('.star-layer-2');
      const planets = spaceRef.current.querySelectorAll('.planet');
      
      starsLayer0.forEach(star => {
        (star as HTMLElement).style.transform = `translate(${xAxis * 0.5}px, ${yAxis * 0.5}px)`;
      });
      
      starsLayer1.forEach(star => {
        (star as HTMLElement).style.transform = `translate(${xAxis * 0.3}px, ${yAxis * 0.3}px)`;
      });
      
      starsLayer2.forEach(star => {
        (star as HTMLElement).style.transform = `translate(${xAxis * 0.1}px, ${yAxis * 0.1}px)`;
      });
      
      planets.forEach(planet => {
        (planet as HTMLElement).style.transform = `translate(${xAxis * 0.2}px, ${yAxis * 0.2}px)`;
      });
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
        
        {/* Floating astronaut that floats in from the side */}
        <div className="astronaut-container" ref={astronautRef}>
          <div className="astronaut">
            <div className="astronaut-helmet"></div>
            <div className="astronaut-body"></div>
            <div className="astronaut-backpack"></div>
            <div className="astronaut-jetpack">
              <div className="jetpack-fire"></div>
            </div>
          </div>
        </div>
        
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
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