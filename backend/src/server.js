const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Log environment variables for debugging (but not the full API key)
console.log('Environment variables loaded:');
console.log('- PORT:', PORT);
console.log('- NASA_API_KEY exists:', !!process.env.NASA_API_KEY);
if (process.env.NASA_API_KEY) {
  console.log('- NASA_API_KEY length:', process.env.NASA_API_KEY.length);
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CosmicVista Backend API' });
});

// NASA API proxy route
app.get('/api/apod', async (req, res) => {
  try {
    const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    console.log(`Fetching APOD with API key: ${apiKey ? apiKey.substring(0, 5) + '...' : 'DEMO_KEY'}`);
    
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    console.log(`NASA API response status: ${response.status}`);
    
    // Check if we've hit rate limits
    if (response.status === 429) {
      const errorText = await response.text();
      console.error('Rate limit error:', errorText);
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        message: 'You have exceeded your rate limit. To fix this, get your own NASA API key at https://api.nasa.gov/',
        details: errorText
      });
    }
    
    // Handle authentication errors
    if (response.status === 403) {
      const errorText = await response.text();
      console.error('Authentication error:', errorText);
      return res.status(403).json({ 
        error: 'Authentication failed',
        message: 'Invalid NASA API key. To fix this, get your own NASA API key at https://api.nasa.gov/',
        details: errorText
      });
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`NASA API error (${response.status}):`, errorText);
      return res.status(response.status).json({ 
        error: `Failed to fetch APOD data. Status: ${response.status}`,
        message: 'There was an error fetching data from NASA. Please try again later.',
        details: errorText
      });
    }
    
    const data = await response.json();
    console.log('NASA API response data received');
    
    // Check if NASA API returned an error object
    if (data.error) {
      console.error('NASA API returned error object:', data.error);
      return res.status(400).json({ 
        error: 'NASA API error',
        message: 'There was an error with the NASA API response.',
        details: data.error
      });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching APOD:', error);
    res.status(500).json({ 
      error: 'Failed to fetch APOD data', 
      message: 'There was an error connecting to the NASA API. Please check your internet connection and try again.',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// For Vercel compatibility, we need to export the app
module.exports = app;

// Only start the server if this file is run directly (not in Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`To use your own NASA API key, create a .env file in the backend directory with NASA_API_KEY=your_key_here`);
    console.log(`Get your free NASA API key at: https://api.nasa.gov/`);
  });
}