# CosmicVista

A visually stunning, responsive website that showcases space exploration, celestial bodies, and NASA missions. The site inspires curiosity and provides educational value through interactive content, media galleries, and real-time data integrations.

## Project Overview

CosmicVista is a web application built with modern web technologies to provide an immersive experience for space enthusiasts, educators, and students. The application features:

- Astronomy Picture of the Day (APOD) from NASA
- Mars Rover mission information
- NASA mission details
- Interactive space exploration game
- Responsive design for all devices

## Technical Stack

- **Frontend**: React, TypeScript, CSS3, HTML5 Canvas
- **Backend**: Node.js, Express.js
- **APIs**: NASA Open APIs
- **Deployment**: Vercel

## Project Structure

```
cosmicvista/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── games/
│   │   │   └── SpaceExplorer/  # Space exploration game
│   │   ├── utils/
│   │   └── services/
│   └── public/
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   └── middleware/
    └── public/
```

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cosmicvista
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

### NASA API Key Setup

To use the NASA API features (APOD, Mars Rover photos, etc.), you need to obtain a free NASA API key:

1. Visit [https://api.nasa.gov/](https://api.nasa.gov/)
2. Fill out the "Get API Key" form
3. You'll receive your API key via email

Once you have your API key:

1. Create a `.env` file in the `backend` directory
2. Add your API key to the file:
   ```
   NASA_API_KEY=your_actual_api_key_here
   PORT=3001
   ```
3. Restart the backend server

Without a valid API key, the application will use the DEMO_KEY which has very limited rate limits and often causes errors.

### Development

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

### Space Exploration Game

The project includes an interactive space exploration game built with HTML5 Canvas. To play the game:

1. Start the development server as described above
2. Navigate to `http://localhost:3000` in your browser
3. Click on the "Games" link in the navigation bar
4. Select "Space Explorer" to start playing

**Game Controls:**
- Arrow Keys or WASD: Move the astronaut
- Space: Interact with planets

**Game Features:**
- Control an astronaut exploring space with realistic physics
- Visit different planets and collect samples
- Manage fuel and oxygen resources
- Complete missions and track progress
- Navigate through space with comets, satellites, and debris
- Mini-map for navigation

### Deployment

The application is configured for deployment on Vercel. Follow Vercel's documentation for deployment instructions.

## Features

### Astronomy Picture of the Day (APOD)
View the latest astronomy picture from NASA with detailed explanations.

### Mars Rovers
Explore information about NASA's Mars rover missions.

### Missions
Learn about current and past NASA missions.

### Space Exploration Game
An interactive HTML5 Canvas game where players control an astronaut exploring space, visiting planets, and completing missions.

## API Integration

The application integrates with NASA's Open APIs to fetch real-time data:

- Astronomy Picture of the Day (APOD) API
- Mars Rover Photos API
- Mission data from various NASA endpoints

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.