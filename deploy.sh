#!/bin/bash

# CosmicVista Deployment Script
# This script helps deploy both frontend and backend to cloud services

echo "🚀 Starting CosmicVista Deployment Process"

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
  echo "❌ Error: frontend or backend directory not found"
  echo "Please run this script from the root of the CosmicVista project"
  exit 1
fi

echo "✅ Project structure verified"

# Deploy Frontend to Vercel
echo "🌐 Deploying Frontend to Vercel..."
cd frontend
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Frontend built successfully"
else
  echo "❌ Error building frontend"
  exit 1
fi

cd ..

# For backend deployment, we'll need to:
# 1. Create a production-ready server.js
# 2. Set up environment variables
# 3. Deploy to a cloud service like Render, Railway, or Heroku

echo "🔧 Preparing Backend for Deployment..."

# Create a production version of the server
cat > backend/src/server.prod.js << 'EOF'
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend build (for monolithic deployment)
if (process.env.SERVE_FRONTEND === 'true') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  
  // Handle SPA routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
} else {
  // API routes only
  app.get('/', (req, res) => {
    res.json({ message: 'CosmicVista Backend API is running!' });
  });

  // NASA API proxy route
  app.get('/api/apod', async (req, res) => {
    try {
      const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
      
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
      
      // Handle rate limiting
      if (response.status === 429) {
        return res.status(429).json({ 
          error: 'Rate limit exceeded',
          message: 'API rate limit exceeded. Please get your own NASA API key.'
        });
      }
      
      // Handle authentication errors
      if (response.status === 403) {
        return res.status(403).json({ 
          error: 'Authentication failed',
          message: 'Invalid NASA API key.'
        });
      }
      
      if (!response.ok) {
        return res.status(response.status).json({ 
          error: `Failed to fetch APOD data. Status: ${response.status}`,
          message: 'Error fetching data from NASA API.'
        });
      }
      
      const data = await response.json();
      
      // Check if NASA API returned an error
      if (data.error) {
        return res.status(400).json({ 
          error: 'NASA API error',
          message: 'Error with NASA API response.'
        });
      }
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to fetch APOD data', 
        message: 'Error connecting to NASA API.'
      });
    }
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
EOF

echo "✅ Backend prepared for deployment"

echo "📋 Deployment Instructions:"
echo ""
echo "FRONTEND DEPLOYMENT OPTIONS:"
echo "=========================="
echo "1. Vercel (Recommended for frontend):"
echo "   - Install Vercel CLI: npm install -g vercel"
echo "   - Navigate to frontend directory: cd frontend"
echo "   - Deploy: vercel --prod"
echo ""
echo "2. Netlify:"
echo "   - Build: npm run build"
echo "   - Deploy the dist folder to Netlify"
echo ""
echo "BACKEND DEPLOYMENT OPTIONS:"
echo "=========================="
echo "1. Render (Recommended):"
echo "   - Go to render.com and create a new Web Service"
echo "   - Connect your GitHub repository"
echo "   - Set build command: npm install"
echo "   - Set start command: node src/server.prod.js"
echo "   - Add environment variables (NASA_API_KEY)"
echo ""
echo "2. Railway:"
echo "   - Go to railway.app and create a new project"
echo "   - Deploy from your GitHub repository"
echo "   - Set start command: node src/server.prod.js"
echo "   - Add environment variables (NASA_API_KEY)"
echo ""
echo "ENVIRONMENT VARIABLES:"
echo "====================="
echo "NASA_API_KEY=your_nasa_api_key_here"
echo "PORT=3001"
echo ""
echo "📝 Next Steps:"
echo "1. Get your free NASA API key at https://api.nasa.gov/"
echo "2. Deploy frontend using your preferred method"
echo "3. Deploy backend to a cloud service"
echo "4. Configure frontend to point to your backend URL"
echo ""
echo "🎉 Deployment preparation complete!"