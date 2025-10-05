// Animation utilities for space elements

export const createStars = (container: HTMLElement, count: number = 200) => {
  // Clear existing stars
  const existingStars = container.querySelectorAll('.star');
  existingStars.forEach(star => star.remove());
  
  // Create new stars
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
    star.style.setProperty('--duration', `${Math.random() * 5 + 2}s`);
    container.appendChild(star);
  }
};

export const createPlanets = (container: HTMLElement, count: number = 5) => {
  // Clear existing planets
  const existingPlanets = container.querySelectorAll('.planet');
  existingPlanets.forEach(planet => planet.remove());
  
  // Create planets
  for (let i = 0; i < count; i++) {
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
    
    container.appendChild(planet);
  }
};

export const createSatellites = (container: HTMLElement, count: number = 3) => {
  // Clear existing satellites
  const existingSatellites = container.querySelectorAll('.satellite');
  existingSatellites.forEach(satellite => satellite.remove());
  
  // Create satellites
  for (let i = 0; i < count; i++) {
    const satellite = document.createElement('div');
    satellite.className = 'satellite';
    satellite.style.top = '50%';
    satellite.style.left = '50%';
    satellite.style.setProperty('--radius', `${Math.random() * 300 + 200}px`);
    satellite.style.setProperty('--duration', `${Math.random() * 40 + 30}s`);
    container.appendChild(satellite);
  }
};