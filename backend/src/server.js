const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

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
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});