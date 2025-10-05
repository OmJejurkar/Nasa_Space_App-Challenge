# Deployment Guide for CosmicVista

## Prerequisites

1. A Vercel account (https://vercel.com)
2. Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Prepare Your Repository

Make sure your project is committed to a Git repository:

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Push to Your Git Provider

Push your code to GitHub, GitLab, or Bitbucket:

```bash
git remote add origin <your-repository-url>
git push -u origin main
```

### 3. Deploy to Vercel

1. Go to https://vercel.com and sign in/up
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: `npm run build`
   - Output Directory: dist
5. Click "Deploy"

### 4. Environment Variables

Set the following environment variables in your Vercel project settings:

- `NASA_API_KEY` - Your NASA API key (get one at https://api.nasa.gov)

### 5. Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Project Structure for Vercel

The project is organized to work with Vercel's monorepo support:

```
cosmicvista/
├── frontend/          # React frontend
├── backend/           # Node.js backend
├── vercel.json        # Vercel configuration
└── README.md          # Project documentation
```

## API Routes

The backend API is accessible at `/api/*`:

- `/api/apod` - Astronomy Picture of the Day
- `/api/mars-photos` - Mars Rover Photos (when implemented)

## Troubleshooting

### Build Issues

If you encounter build issues:

1. Check that all dependencies are properly installed
2. Verify the build command in package.json
3. Check the Vercel build logs for specific error messages

### API Issues

If the NASA API is not working:

1. Verify your NASA_API_KEY environment variable
2. Check that the API proxy is correctly configured in the backend
3. Ensure CORS is properly configured

## Support

For additional help, refer to:
- Vercel Documentation: https://vercel.com/docs
- NASA APIs: https://api.nasa.gov