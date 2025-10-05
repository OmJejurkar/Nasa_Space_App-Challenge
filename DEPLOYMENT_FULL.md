# CosmicVista Deployment Guide

This guide will help you deploy the CosmicVista application so that everyone can access it online.

## Prerequisites

1. A GitHub account
2. Node.js installed on your local machine
3. A NASA API key (get one free at https://api.nasa.gov/)

## Option 1: Deploy to Vercel (Frontend) + Render (Backend) - Recommended

### Step 1: Prepare Your Code

1. Create a GitHub repository for your project
2. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

### Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: `npm run build`
   - Output Directory: dist
5. Click "Deploy"
6. Note the URL provided by Vercel (e.g., https://your-app.vercel.app)

### Step 3: Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign up/sign in
2. Click "New+" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: cosmicvista-backend
   - Region: Choose the closest to you
   - Branch: main
   - Root Directory: backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node src/server.js`
5. Add environment variables:
   - NASA_API_KEY: your_actual_nasa_api_key
   - PORT: 3001
6. Click "Create Web Service"

### Step 4: Update Frontend to Point to Your Backend

1. In your frontend code, update the API calls to point to your Render backend URL
2. The backend URL will be something like: https://your-backend-service.onrender.com
3. Update the NASA API service file in your frontend to use this URL

### Step 5: Redeploy Frontend

After updating the API URL, redeploy your frontend on Vercel.

## Option 2: Deploy Everything to Vercel (Monorepo)

### Step 1: Configure for Monorepo Deployment

1. Create a `vercel.json` file in the root directory:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "frontend/package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist"
         }
       },
       {
         "src": "backend/src/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "backend/src/server.js"
       },
       {
         "src": "/(.*)",
         "dest": "frontend/dist/index.html"
       }
     ]
   }
   ```

### Step 2: Deploy to Vercel

1. Push your changes to GitHub
2. Import your repository to Vercel
3. Configure the project:
   - Framework Preset: Other
   - Root Directory: /
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: frontend/dist
4. Add environment variables:
   - NASA_API_KEY: your_actual_nasa_api_key
5. Deploy

## Option 3: Deploy to Netlify (Frontend) + Railway (Backend)

### Step 1: Deploy Frontend to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/sign in
2. Click "New site from Git"
3. Connect to your GitHub repository
4. Configure the deployment:
   - Base directory: frontend
   - Build command: `npm run build`
   - Publish directory: dist
5. Deploy site

### Step 2: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) and sign up/sign in
2. Click "New Project"
3. Provision a new service from your GitHub repository
4. Configure the service:
   - Framework: Node.js
   - Build command: `npm install`
   - Start command: `node src/server.js`
5. Add environment variables:
   - NASA_API_KEY: your_actual_nasa_api_key
   - PORT: 3001
6. Deploy

## Environment Variables

You'll need to set these environment variables in your deployment platform:

```
NASA_API_KEY=your_actual_nasa_api_key_here
PORT=3001
```

## Getting a NASA API Key

1. Go to https://api.nasa.gov/
2. Fill in your name, email, and application name
3. Click "Sign Up"
4. You'll receive your API key via email

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your backend is configured with proper CORS headers
2. **API Rate Limiting**: Use your own NASA API key to avoid rate limits
3. **Environment Variables Not Set**: Double-check that all environment variables are correctly set in your deployment platform
4. **Build Failures**: Ensure all dependencies are correctly listed in package.json

### Checking Deployment Status

1. **Vercel**: Check the deployment logs in your Vercel dashboard
2. **Render**: Check the logs in your Render dashboard
3. **Netlify**: Check the deploy logs in your Netlify dashboard
4. **Railway**: Check the deployment logs in your Railway dashboard

## Cost Considerations

1. **Vercel**: Free tier available with some limitations
2. **Render**: Free tier with some limitations, paid plans available
3. **Netlify**: Free tier available with some limitations
4. **Railway**: Free tier with $5 credit for new users

All platforms offer free tiers that should be sufficient for a small application like CosmicVista.