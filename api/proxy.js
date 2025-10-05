// Vercel API proxy for NASA API
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

module.exports = (req, res) => {
  // Create Express app
  const app = express();
  
  // Enable CORS
  app.use(cors());
  app.use(express.json());
  
  // Proxy route for NASA APOD API
  app.get('/api/apod', async (request, response) => {
    try {
      const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
      
      // Forward the request to NASA API
      const nasaResponse = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
        {
          method: request.method,
          headers: {
            'Content-Type': 'application/json',
            ...request.headers,
          },
        }
      );
      
      // Handle rate limiting
      if (nasaResponse.status === 429) {
        return response.status(429).json({
          error: 'Rate limit exceeded',
          message: 'API rate limit exceeded. Please get your own NASA API key at https://api.nasa.gov/.',
        });
      }
      
      // Handle authentication errors
      if (nasaResponse.status === 403) {
        return response.status(403).json({
          error: 'Authentication failed',
          message: 'Invalid NASA API key.',
        });
      }
      
      if (!nasaResponse.ok) {
        return response.status(nasaResponse.status).json({
          error: `Failed to fetch APOD data. Status: ${nasaResponse.status}`,
          message: 'Error fetching data from NASA API.',
        });
      }
      
      const data = await nasaResponse.json();
      
      // Check if NASA API returned an error
      if (data.error) {
        return response.status(400).json({
          error: 'NASA API error',
          message: 'Error with NASA API response.',
        });
      }
      
      response.status(200).json(data);
    } catch (error) {
      response.status(500).json({
        error: 'Failed to fetch APOD data',
        message: 'Error connecting to NASA API.',
      });
    }
  });
  
  // Handle the request
  app(req, res);
};