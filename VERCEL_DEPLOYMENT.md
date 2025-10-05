# Vercel Deployment Guide for CosmicVista

This guide will help you deploy your CosmicVista application to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (free at vercel.com)
3. Your NASA API key (get one at https://api.nasa.gov/)

## Deployment Steps

### 1. Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git init
git add .
git commit -m "Prepare for Vercel deployment"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

### 2. Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: (leave empty for root)
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`

### 3. Set Environment Variables

In your Vercel project settings, go to "Environment Variables" and add:

```
NASA_API_KEY=your_actual_nasa_api_key_here
```

You can use the same API key you have in your local `.env` file.

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## Troubleshooting

### Common Issues

1. **Build Failures**: Make sure all dependencies are correctly listed in package.json
2. **API Errors**: Verify your NASA_API_KEY is correctly set in Vercel environment variables
3. **Routing Issues**: If you encounter routing problems, you may need to configure rewrites in vercel.json

### Checking Deployment Logs

You can check your deployment logs in the Vercel dashboard to diagnose any issues.

## Custom Domain (Optional)

After deployment, you can add a custom domain in your Vercel project settings.

## Redeployment

After making changes to your code:
1. Push to GitHub
2. Vercel will automatically detect the changes and start a new deployment
3. Or manually trigger a deployment from your Vercel dashboard

Your CosmicVista application should now be live and accessible to everyone!