// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const fuelFill = document.getElementById('fuelFill');
const oxygenFill = document.getElementById('oxygenFill');
const visitedCount = document.getElementById('visitedCount');
const planetPopup = document.getElementById('planetPopup');
const planetName = document.getElementById('planetName');
const planetInfo = document.getElementById('planetInfo');
const missionLog = document.getElementById('missionLog');
const closePopup = document.getElementById('closePopup');
const gameOver = document.getElementById('gameOver');
const restartGame = document.getElementById('restartGame');
const miniMap = document.getElementById('miniMap');
const inventoryList = document.getElementById('inventoryList');

// Set canvas dimensions
function resizeCanvas() {
    // Ensure canvas has dimensions
    if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
}

// Game state
const gameState = {
    player: {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 20,
        speed: 0.2,
        friction: 0.95,
        thrust: 0.1,
        maxSpeed: 5
    },
    fuel: 100,
    oxygen: 100,
    visitedPlanets: 0,
    totalPlanets: 5,
    gameOver: false,
    keys: {},
    missions: [],
    completedMissions: 0,
    inventory: [],
    gameTime: 0
};

// Game objects
const stars = [];
const planets = [];
const debris = [];
const comets = [];
const satellites = [];
const gravityZones = [];

// Mission system
const missions = [
    { id: 1, name: "Collect Samples", description: "Collect samples from a planetary surface", completed: false },
    { id: 2, name: "Repair Satellite", description: "Repair a damaged satellite in orbit", completed: false },
    { id: 3, name: "Land on Mars", description: "Successfully land on the surface of Mars", completed: false },
    { id: 4, name: "Navigate Asteroid Field", description: "Navigate through a dangerous asteroid field", completed: false },
    { id: 5, name: "Explore Unknown Planet", description: "Explore a newly discovered planet", completed: false }
];

// Initialize game
function init() {
    // Ensure canvas is properly sized
    resizeCanvas();
    
    // Position player in center
    gameState.player.x = canvas.width / 2;
    gameState.player.y = canvas.height / 2;
    
    // Create stars
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.05,
            brightness: Math.random() * 0.5 + 0.5,
            layer: Math.floor(Math.random() * 3) // For parallax effect
        });
    }
    
    // Create planets with proper spacing
    const planetNames = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
    const planetColors = ['#A9A9A9', '#E6BC6F', '#CD5C5C', '#D8CA9D', '#E3B96A'];
    const planetFacts = [
        'Mercury is the smallest and innermost planet in the Solar System.',
        'Venus is the hottest planet with surface temperatures reaching 471°C.',
        'Mars is often called the "Red Planet" due to its reddish appearance.',
        'Jupiter is the largest planet with a mass two and a half times that of all other planets combined.',
        'Saturn is known for its prominent ring system made of ice particles and rocky debris.'
    ];
    
    // Function to check if a planet position is valid (not too close to others)
    function isPositionValid(x, y, radius, existingPlanets) {
        for (const planet of existingPlanets) {
            const dx = x - planet.x;
            const dy = y - planet.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // Ensure planets are at least 1.5x their combined radii apart
            const minDistance = (radius + planet.radius) * 1.5;
            if (distance < minDistance) {
                return false;
            }
        }
        return true;
    }
    
    // Create planets with proper spacing
    for (let i = 0; i < 5; i++) {
        let x, y, radius;
        let attempts = 0;
        const maxAttempts = 100;
        
        // Try to find a valid position
        do {
            radius = Math.random() * 30 + 40;
            x = Math.random() * (canvas.width - radius * 2) + radius;
            y = Math.random() * (canvas.height - radius * 2) + radius;
            attempts++;
        } while (!isPositionValid(x, y, radius, planets) && attempts < maxAttempts);
        
        planets.push({
            x: x,
            y: y,
            radius: radius,
            color: planetColors[i],
            name: planetNames[i],
            fact: planetFacts[i],
            visited: false,
            rings: i === 4, // Saturn has rings
            gravity: 0.05 + Math.random() * 0.1 // Gravity strength
        });
    }
    
    // Create gravity zones around planets
    planets.forEach(planet => {
        gravityZones.push({
            x: planet.x,
            y: planet.y,
            radius: planet.radius * 3,
            strength: planet.gravity
        });
    });
    
    // Create space debris
    for (let i = 0; i < 30; i++) {
        debris.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            speed: Math.random() * 0.5 + 0.1,
            angle: Math.random() * Math.PI * 2,
            rotation: Math.random() * 0.1 - 0.05
        });
    }
    
    // Create comets
    for (let i = 0; i < 5; i++) {
        comets.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 2 + 1,
            angle: Math.random() * Math.PI * 2,
            tailLength: Math.random() * 30 + 20,
            color: `hsl(${Math.random() * 60}, 100%, 70%)`
        });
    }
    
    // Create satellites
    for (let i = 0; i < 8; i++) {
        satellites.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 0.8 + 0.2,
            angle: Math.random() * Math.PI * 2,
            rotation: Math.random() * 0.05 - 0.025,
            orbitRadius: Math.random() * 100 + 50,
            orbitAngle: Math.random() * Math.PI * 2,
            centerX: Math.random() * canvas.width,
            centerY: Math.random() * canvas.height
        });
    }
    
    // Initialize missions
    gameState.missions = [...missions];
    
    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('keydown', (e) => {
        gameState.keys[e.key] = true;
    });
    window.addEventListener('keyup', (e) => {
        gameState.keys[e.key] = false;
    });
    
    closePopup.addEventListener('click', () => {
        planetPopup.style.display = 'none';
    });
    
    restartGame.addEventListener('click', () => {
        resetGame();
    });
    
    // Start game loop
    requestAnimationFrame(gameLoop);
}

// Reset game state
function resetGame() {
    gameState.player.x = canvas.width / 2;
    gameState.player.y = canvas.height / 2;
    gameState.player.vx = 0;
    gameState.player.vy = 0;
    gameState.fuel = 100;
    gameState.oxygen = 100;
    gameState.visitedPlanets = 0;
    gameState.gameOver = false;
    gameState.completedMissions = 0;
    gameState.inventory = [];
    gameState.gameTime = 0;
    
    // Reset planets
    planets.forEach(planet => {
        planet.visited = false;
    });
    
    // Reset missions
    gameState.missions = [...missions];
    
    visitedCount.textContent = '0';
    gameOver.style.display = 'none';
    planetPopup.style.display = 'none';
    
    updateFuelDisplay();
    updateOxygenDisplay();
    updateMissionLog();
    updateInventory();
}

// Update fuel display
function updateFuelDisplay() {
    if (fuelFill) {
        fuelFill.style.width = `${gameState.fuel}%`;
        if (gameState.fuel < 30) {
            fuelFill.style.background = 'linear-gradient(90deg, #ff0000, #ff5500)';
        } else if (gameState.fuel < 60) {
            fuelFill.style.background = 'linear-gradient(90deg, #ff5500, #ffaa00)';
        } else {
            fuelFill.style.background = 'linear-gradient(90deg, #00dbde, #00ff55)';
        }
    }
}

// Update oxygen display
function updateOxygenDisplay() {
    if (oxygenFill) {
        oxygenFill.style.width = `${gameState.oxygen}%`;
        if (gameState.oxygen < 30) {
            oxygenFill.style.background = 'linear-gradient(90deg, #ff0000, #ff5500)';
        } else if (gameState.oxygen < 60) {
            oxygenFill.style.background = 'linear-gradient(90deg, #ff5500, #ffaa00)';
        } else {
            oxygenFill.style.background = 'linear-gradient(90deg, #00dbde, #00ff55)';
        }
    }
}

// Update mission log
function updateMissionLog() {
    if (missionLog) {
        missionLog.innerHTML = '';
        gameState.missions.forEach(mission => {
            const missionElement = document.createElement('div');
            missionElement.className = `mission ${mission.completed ? 'completed' : ''}`;
            missionElement.innerHTML = `
                <h4>${mission.name}</h4>
                <p>${mission.description}</p>
            `;
            missionLog.appendChild(missionElement);
        });
    }
}

// Update inventory
function updateInventory() {
    if (inventoryList) {
        inventoryList.innerHTML = '';
        if (gameState.inventory.length === 0) {
            inventoryList.innerHTML = '<p>No items collected</p>';
        } else {
            gameState.inventory.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'inventory-item';
                itemElement.textContent = item;
                inventoryList.appendChild(itemElement);
            });
        }
    }
}

// Handle player movement with enhanced physics
function handleMovement() {
    // Apply thrust based on key presses
    let thrusting = false;
    
    if (gameState.keys['ArrowUp'] || gameState.keys['w'] || gameState.keys['W']) {
        gameState.player.vy -= gameState.player.thrust;
        thrusting = true;
    }
    if (gameState.keys['ArrowDown'] || gameState.keys['s'] || gameState.keys['S']) {
        gameState.player.vy += gameState.player.thrust;
        thrusting = true;
    }
    if (gameState.keys['ArrowLeft'] || gameState.keys['a'] || gameState.keys['A']) {
        gameState.player.vx -= gameState.player.thrust;
        thrusting = true;
    }
    if (gameState.keys['ArrowRight'] || gameState.keys['d'] || gameState.keys['D']) {
        gameState.player.vx += gameState.player.thrust;
        thrusting = true;
    }
    
    // Apply gravity from planets
    gravityZones.forEach(zone => {
        const dx = gameState.player.x - zone.x;
        const dy = gameState.player.y - zone.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < zone.radius) {
            // Calculate gravity force
            const force = zone.strength * (1 - distance / zone.radius);
            const angle = Math.atan2(dy, dx);
            
            // Apply gravity
            gameState.player.vx -= Math.cos(angle) * force;
            gameState.player.vy -= Math.sin(angle) * force;
        }
    });
    
    // Limit maximum speed
    const speed = Math.sqrt(gameState.player.vx * gameState.player.vx + gameState.player.vy * gameState.player.vy);
    if (speed > gameState.player.maxSpeed) {
        gameState.player.vx = (gameState.player.vx / speed) * gameState.player.maxSpeed;
        gameState.player.vy = (gameState.player.vy / speed) * gameState.player.maxSpeed;
    }
    
    // Apply friction
    gameState.player.vx *= gameState.player.friction;
    gameState.player.vy *= gameState.player.friction;
    
    // Consume fuel when thrusting
    if (thrusting && gameState.fuel > 0) {
        gameState.fuel -= 0.2;
    }
    
    // Consume oxygen over time
    if (gameState.oxygen > 0) {
        gameState.oxygen -= 0.05;
    }
    
    // Update position
    gameState.player.x += gameState.player.vx;
    gameState.player.y += gameState.player.vy;
    
    // Boundary checks with bounce
    if (gameState.player.x < gameState.player.radius) {
        gameState.player.x = gameState.player.radius;
        gameState.player.vx *= -0.5;
    }
    if (gameState.player.x > canvas.width - gameState.player.radius) {
        gameState.player.x = canvas.width - gameState.player.radius;
        gameState.player.vx *= -0.5;
    }
    if (gameState.player.y < gameState.player.radius) {
        gameState.player.y = gameState.player.radius;
        gameState.player.vy *= -0.5;
    }
    if (gameState.player.y > canvas.height - gameState.player.radius) {
        gameState.player.y = canvas.height - gameState.player.radius;
        gameState.player.vy *= -0.5;
    }
    
    // Update fuel and oxygen displays
    updateFuelDisplay();
    updateOxygenDisplay();
    
    // Check for game over conditions
    if (gameState.fuel <= 0 || gameState.oxygen <= 0) {
        if (gameOver) {
            gameOver.style.display = 'flex';
        }
        gameState.gameOver = true;
    }
}

// Check for planet collisions
function checkPlanetCollisions() {
    planets.forEach(planet => {
        if (planet.visited) return;
        
        const dx = gameState.player.x - planet.x;
        const dy = gameState.player.y - planet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If player is close to a planet
        if (distance < planet.radius + gameState.player.radius + 30) {
            // Show planet info
            if (planetName) planetName.textContent = planet.name;
            if (planetInfo) planetInfo.textContent = planet.fact;
            if (planetPopup) planetPopup.style.display = 'block';
            planet.visited = true;
            gameState.visitedPlanets++;
            if (visitedCount) visitedCount.textContent = gameState.visitedPlanets;
            
            // Add sample to inventory
            gameState.inventory.push(`${planet.name} Sample`);
            updateInventory();
            
            // Complete "Collect Samples" mission
            const collectMission = gameState.missions.find(m => m.id === 1 && !m.completed);
            if (collectMission) {
                collectMission.completed = true;
                gameState.completedMissions++;
                updateMissionLog();
            }
            
            // Check if all planets visited
            if (gameState.visitedPlanets >= gameState.totalPlanets) {
                setTimeout(() => {
                    if (gameOver) {
                        gameOver.style.display = 'flex';
                    }
                    gameState.gameOver = true;
                }, 1000);
            }
        }
    });
}

// Draw stars with parallax effect
function drawStars() {
    if (!ctx) return;
    
    ctx.fillStyle = '#FFFFFF';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move stars for parallax effect based on layer
        star.y += star.speed * (star.layer + 1) * 0.5;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

// Draw space debris
function drawDebris() {
    if (!ctx) return;
    
    ctx.fillStyle = '#AAAAAA';
    debris.forEach(piece => {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.angle);
        
        // Draw irregular shape
        ctx.beginPath();
        ctx.moveTo(0, -piece.size);
        ctx.lineTo(piece.size, piece.size);
        ctx.lineTo(-piece.size, piece.size);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
        
        // Move debris
        piece.x += Math.cos(piece.angle) * piece.speed;
        piece.y += Math.sin(piece.angle) * piece.speed;
        piece.angle += piece.rotation;
        
        // Wrap around screen
        if (piece.x < -piece.size) piece.x = canvas.width + piece.size;
        if (piece.x > canvas.width + piece.size) piece.x = -piece.size;
        if (piece.y < -piece.size) piece.y = canvas.height + piece.size;
        if (piece.y > canvas.height + piece.size) piece.y = -piece.size;
    });
}

// Draw comets
function drawComets() {
    if (!ctx) return;
    
    comets.forEach(comet => {
        // Draw comet tail
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(
            comet.x - Math.cos(comet.angle) * comet.tailLength,
            comet.y - Math.sin(comet.angle) * comet.tailLength
        );
        ctx.strokeStyle = comet.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw comet head
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
        ctx.fillStyle = comet.color;
        ctx.fill();
        
        // Move comet
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;
        
        // Wrap around screen
        if (comet.x < -comet.tailLength) comet.x = canvas.width + comet.tailLength;
        if (comet.x > canvas.width + comet.tailLength) comet.x = -comet.tailLength;
        if (comet.y < -comet.tailLength) comet.y = canvas.height + comet.tailLength;
        if (comet.y > canvas.height + comet.tailLength) comet.y = -comet.tailLength;
    });
}

// Draw satellites
function drawSatellites() {
    if (!ctx) return;
    
    satellites.forEach(satellite => {
        // Update orbit position
        satellite.orbitAngle += satellite.speed * 0.01;
        satellite.x = satellite.centerX + Math.cos(satellite.orbitAngle) * satellite.orbitRadius;
        satellite.y = satellite.centerY + Math.sin(satellite.orbitAngle) * satellite.orbitRadius;
        satellite.angle += satellite.rotation;
        
        ctx.save();
        ctx.translate(satellite.x, satellite.y);
        ctx.rotate(satellite.angle);
        
        // Draw satellite body
        ctx.fillStyle = '#CCCCCC';
        ctx.fillRect(-satellite.size/2, -satellite.size/2, satellite.size, satellite.size);
        
        // Draw solar panels
        ctx.fillStyle = '#2E8B57';
        ctx.fillRect(-satellite.size, -satellite.size/4, satellite.size, satellite.size/2);
        ctx.fillRect(satellite.size, -satellite.size/4, satellite.size, satellite.size/2);
        
        ctx.restore();
    });
}

// Draw planets
function drawPlanets() {
    if (!ctx) return;
    
    planets.forEach(planet => {
        // Draw planet
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();
        
        // Draw planet highlight
        ctx.beginPath();
        ctx.arc(planet.x - planet.radius * 0.3, planet.y - planet.radius * 0.3, planet.radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
        
        // Draw rings for Saturn
        if (planet.rings) {
            ctx.save();
            ctx.translate(planet.x, planet.y);
            ctx.rotate(Math.PI / 4);
            ctx.beginPath();
            ctx.ellipse(0, 0, planet.radius * 1.5, planet.radius * 0.3, 0, 0, Math.PI * 2);
            ctx.strokeStyle = '#E3B96A';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();
        }
        
        // Draw visited indicator
        if (planet.visited) {
            ctx.beginPath();
            ctx.arc(planet.x, planet.y, planet.radius + 10, 0, Math.PI * 2);
            ctx.strokeStyle = '#00FF00';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });
}

// Draw player (astronaut) with enhanced visuals
function drawPlayer() {
    if (!ctx) return;
    
    ctx.save();
    ctx.translate(gameState.player.x, gameState.player.y);
    
    // Draw jetpack flames when moving or thrusting
    const isThrusting = gameState.keys['ArrowUp'] || gameState.keys['w'] || gameState.keys['W'] ||
                       gameState.keys['ArrowDown'] || gameState.keys['s'] || gameState.keys['S'] ||
                       gameState.keys['ArrowLeft'] || gameState.keys['a'] || gameState.keys['A'] ||
                       gameState.keys['ArrowRight'] || gameState.keys['d'] || gameState.keys['D'];
    
    if (isThrusting && gameState.fuel > 0) {
        // Main flame
        ctx.fillStyle = '#FF5500';
        ctx.beginPath();
        ctx.moveTo(-15, 0);
        ctx.lineTo(-25, -5);
        ctx.lineTo(-25, 5);
        ctx.closePath();
        ctx.fill();
        
        // Secondary flames
        ctx.fillStyle = '#FFAA00';
        ctx.beginPath();
        ctx.moveTo(-15, -3);
        ctx.lineTo(-20, -7);
        ctx.lineTo(-20, 1);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(-15, 3);
        ctx.lineTo(-20, 7);
        ctx.lineTo(-20, -1);
        ctx.closePath();
        ctx.fill();
    }
    
    // Draw astronaut body
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.arc(0, 0, gameState.player.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw helmet
    ctx.fillStyle = '#87CEEB';
    ctx.beginPath();
    ctx.arc(0, -5, gameState.player.radius * 0.7, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw helmet reflection
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(-3, -8, gameState.player.radius * 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw visor
    ctx.fillStyle = '#1E90FF';
    ctx.beginPath();
    ctx.ellipse(0, -5, gameState.player.radius * 0.6, gameState.player.radius * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

// Draw fuel and oxygen warnings
function drawWarnings() {
    if (!ctx) return;
    
    if (gameState.fuel < 20) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '24px Arial';
        ctx.fillStyle = '#FF0000';
        ctx.textAlign = 'center';
        ctx.fillText('LOW FUEL!', canvas.width / 2, 50);
    }
    
    if (gameState.oxygen < 20) {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '24px Arial';
        ctx.fillStyle = '#0000FF';
        ctx.textAlign = 'center';
        ctx.fillText('LOW OXYGEN!', canvas.width / 2, 80);
    }
}

// Draw mini-map
function drawMiniMap() {
    if (!ctx || !miniMap) return;
    
    const mapWidth = 200;
    const mapHeight = 150;
    const mapX = canvas.width - mapWidth - 20;
    const mapY = 20;
    
    // Draw map background
    ctx.fillStyle = 'rgba(0, 0, 30, 0.7)';
    ctx.fillRect(mapX, mapY, mapWidth, mapHeight);
    
    // Draw border
    ctx.strokeStyle = '#00dbde';
    ctx.lineWidth = 2;
    ctx.strokeRect(mapX, mapY, mapWidth, mapHeight);
    
    // Scale factors
    const scaleX = mapWidth / canvas.width;
    const scaleY = mapHeight / canvas.height;
    
    // Draw planets on map
    planets.forEach(planet => {
        ctx.beginPath();
        ctx.arc(
            mapX + planet.x * scaleX,
            mapY + planet.y * scaleY,
            Math.max(planet.radius * scaleX, 2),
            0,
            Math.PI * 2
        );
        ctx.fillStyle = planet.visited ? '#00FF00' : planet.color;
        ctx.fill();
    });
    
    // Draw player on map
    ctx.beginPath();
    ctx.arc(
        mapX + gameState.player.x * scaleX,
        mapY + gameState.player.y * scaleY,
        3,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
}

// Main game loop
function gameLoop() {
    // Check if canvas context is available
    if (!ctx || !canvas) {
        requestAnimationFrame(gameLoop);
        return;
    }
    
    // Ensure canvas has dimensions
    if (canvas.width === 0 || canvas.height === 0) {
        resizeCanvas();
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update game time
    gameState.gameTime++;
    
    // Update game state if not game over
    if (!gameState.gameOver) {
        handleMovement();
        checkPlanetCollisions();
    }
    
    // Draw game objects
    drawStars();
    drawDebris();
    drawComets();
    drawSatellites();
    drawPlanets();
    drawPlayer();
    drawWarnings();
    drawMiniMap();
    
    // Continue game loop
    requestAnimationFrame(gameLoop);
}

// Start the game when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}