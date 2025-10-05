@echo off
REM CosmicVista Deployment Script for Windows

echo 🚀 Starting CosmicVista Deployment Process

REM Check if we're in the right directory
if not exist "frontend" (
  echo ❌ Error: frontend directory not found
  echo Please run this script from the root of the CosmicVista project
  pause
  exit /b 1
)

if not exist "backend" (
  echo ❌ Error: backend directory not found
  echo Please run this script from the root of the CosmicVista project
  pause
  exit /b 1
)

echo ✅ Project structure verified

REM Deploy Frontend to Vercel
echo 🌐 Preparing Frontend for Deployment...
cd frontend
call npm run build

if %errorlevel% neq 0 (
  echo ❌ Error building frontend
  cd ..
  pause
  exit /b 1
)

echo ✅ Frontend built successfully
cd ..

REM Prepare Backend for Deployment
echo 🔧 Preparing Backend for Deployment...

REM Create a production version of the server
(
  echo const express = require('express');
  echo const cors = require('cors');
  echo const dotenv = require('dotenv');
  echo const path = require('path');
  echo.
  echo // Load environment variables
  echo dotenv.config({ path: path.resolve(__dirname, '../.env') });
  echo.
  echo const app = express();
  echo const PORT = process.env.PORT ^|^| 3001;
  echo.
  echo // Middleware
  echo app.use(cors());
  echo app.use(express.json());
  echo.
  echo // API routes only
  echo app.get('/', (req, res) =^> {
  echo   res.json({ message: 'CosmicVista Backend API is running!' });
  echo });
  echo.
  echo // NASA API proxy route
  echo app.get('/api/apod', async (req, res) =^> {
  echo   try {
  echo     const apiKey = process.env.NASA_API_KEY ^|^| 'DEMO_KEY';
  echo.
  echo     const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  echo.
  echo     // Handle rate limiting
  echo     if (response.status === 429) {
  echo       return res.status(429).json({
  echo         error: 'Rate limit exceeded',
  echo         message: 'API rate limit exceeded. Please get your own NASA API key.'
  echo       });
  echo     }
  echo.
  echo     // Handle authentication errors
  echo     if (response.status === 403) {
  echo       return res.status(403).json({
  echo         error: 'Authentication failed',
  echo         message: 'Invalid NASA API key.'
  echo       });
  echo     }
  echo.
  echo     if (!response.ok) {
  echo       return res.status(response.status).json({
  echo         error: `Failed to fetch APOD data. Status: ${response.status}`,
  echo         message: 'Error fetching data from NASA API.'
  echo       });
  echo     }
  echo.
  echo     const data = await response.json();
  echo.
  echo     // Check if NASA API returned an error
  echo     if (data.error) {
  echo       return res.status(400).json({
  echo         error: 'NASA API error',
  echo         message: 'Error with NASA API response.'
  echo       });
  echo     }
  echo.
  echo     res.json(data);
  echo   } catch (error) {
  echo     res.status(500).json({
  echo       error: 'Failed to fetch APOD data',
  echo       message: 'Error connecting to NASA API.'
  echo     });
  echo   }
  echo });
  echo.
  echo app.listen(PORT, () =^> {
  echo   console.log(`🚀 Server is running on port ${PORT}`);
  echo });
) > backend/src/server.prod.js

echo ✅ Backend prepared for deployment

echo 📋 Deployment Instructions:
echo.
echo FRONTEND DEPLOYMENT OPTIONS:
echo ==========================
echo 1. Vercel (Recommended for frontend):
echo    - Install Vercel CLI: npm install -g vercel
echo    - Navigate to frontend directory: cd frontend
echo    - Deploy: vercel --prod
echo.
echo 2. Netlify:
echo    - Build: npm run build
echo    - Deploy the dist folder to Netlify
echo.
echo BACKEND DEPLOYMENT OPTIONS:
echo ==========================
echo 1. Render (Recommended):
echo    - Go to render.com and create a new Web Service
echo    - Connect your GitHub repository
echo    - Set build command: npm install
echo    - Set start command: node src/server.prod.js
echo    - Add environment variables (NASA_API_KEY)
echo.
echo 2. Railway:
echo    - Go to railway.app and create a new project
echo    - Deploy from your GitHub repository
echo    - Set start command: node src/server.prod.js
echo    - Add environment variables (NASA_API_KEY)
echo.
echo ENVIRONMENT VARIABLES:
echo =====================
echo NASA_API_KEY=your_nasa_api_key_here
echo PORT=3001
echo.
echo 📝 Next Steps:
echo 1. Get your free NASA API key at https://api.nasa.gov/
echo 2. Deploy frontend using your preferred method
echo 3. Deploy backend to a cloud service
echo 4. Configure frontend to point to your backend URL
echo.
echo 🎉 Deployment preparation complete!

pause