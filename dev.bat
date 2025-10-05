@echo off
echo Starting CosmicVista Development Environment...

echo Starting Backend Server...
cd backend
start "Backend" cmd /k "npm run dev"

echo Starting Frontend Development Server...
cd ../frontend
start "Frontend" cmd /k "npm run dev"

echo Development environment started!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:8000