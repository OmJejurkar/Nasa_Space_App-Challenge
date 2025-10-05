# Deployment Guide

This guide explains how to deploy the CosmicVista application to various platforms.

## GitHub Pages Deployment

### Prerequisites

1. Create a GitHub repository for your project
2. Install the `gh-pages` package in the frontend directory:
   ```bash
   cd frontend
   npm install gh-pages --save-dev
   ```

### Configuration

1. Update the `frontend/package.json` file to include deployment scripts:
   ```json
   {
     "name": "cosmicvista-frontend",
     "homepage": "https://<your-github-username>.github.io/<repository-name>",
     "scripts": {
       "dev": "vite",
       "build": "tsc && vite build",
       "preview": "vite preview",
       "test": "jest",
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. Replace `<your-github-username>` and `<repository-name>` with your actual GitHub username and repository name.

### Deployment Steps

1. Build and deploy the application:
   ```bash
   cd frontend
   npm run deploy
   ```

2. Go to your GitHub repository settings and navigate to the "Pages" section.

3. Under "Source", select "gh-pages branch" and save.

4. Your application will be available at `https://<your-github-username>.github.io/<repository-name>`

## Vercel Deployment

The application is already configured for Vercel deployment through the `vercel.json` file.

### Steps

1. Sign up for a Vercel account at [vercel.com](https://vercel.com)

2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Deploy from the command line:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your deployment

## Netlify Deployment

### Steps

1. Sign up for a Netlify account at [netlify.com](https://netlify.com)

2. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

4. Deploy using the Netlify CLI:
   ```bash
   netlify deploy
   ```

5. Follow the prompts to configure your deployment

## Running Locally

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)

### Steps

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

4. Start the backend server:
   ```bash
   npm run dev
   ```

5. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Space Exploration Game

The space exploration game is built with HTML5 Canvas and can be played directly in the browser. No additional setup is required beyond running the frontend server.

### Game Features

- Control an astronaut exploring space with realistic physics
- Visit different planets and collect samples
- Manage fuel and oxygen resources
- Complete missions and track progress
- Navigate through space with comets, satellites, and debris
- Mini-map for navigation

### Game Controls

- Arrow Keys or WASD: Move the astronaut
- Space: Interact with planets

## Troubleshooting

### Common Issues

1. **Port already in use**: If you see "Port 3000 is in use", the development server will automatically try other ports (3001, 3002, etc.)

2. **Missing dependencies**: If you encounter module not found errors, run `npm install` in both the frontend and backend directories

3. **API errors**: Ensure the backend server is running when testing API integrations

### Game Issues

1. **Game not loading**: Ensure all files in the `frontend/src/games/SpaceExplorer/` directory are present

2. **Controls not working**: Make sure you're clicking on the game canvas before using keyboard controls

3. **Performance issues**: The game is optimized for modern browsers. If experiencing performance issues, try a different browser

## Customization

### Modifying the Game

The space exploration game files are located in `frontend/src/games/SpaceExplorer/`:

- `index.html`: Game structure and UI elements
- `style.css`: Game styling and animations
- `script.js`: Game logic, physics, and rendering

### Adding New Features

To add new features to the game:

1. Modify the appropriate files in the `SpaceExplorer` directory
2. Test locally using `npm run dev`
3. Deploy using your preferred deployment method

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to your fork
5. Create a pull request

## Support

For support, please open an issue on the GitHub repository or contact the maintainers.