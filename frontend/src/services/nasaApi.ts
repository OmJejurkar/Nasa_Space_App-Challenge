// NASA API Service
const NASA_API_BASE = '/api';
const NASA_API_KEY = 'DEMO_KEY';

// Fetch Astronomy Picture of the Day
export const fetchApod = async () => {
  try {
    const response = await fetch(`${NASA_API_BASE}/apod?api_key=${NASA_API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch APOD data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching APOD:', error);
    throw error;
  }
};

// Fetch Mars Rover Photos
export const fetchMarsPhotos = async (rover: string, date: string) => {
  try {
    const response = await fetch(`${NASA_API_BASE}/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${NASA_API_KEY}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${rover} photos`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${rover} photos:`, error);
    throw error;
  }
};

// Fetch Mars Rover Manifest
export const fetchRoverManifest = async (rover: string) => {
  try {
    const response = await fetch(`${NASA_API_BASE}/mars-photos/api/v1/rovers/${rover}?api_key=${NASA_API_KEY}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${rover} manifest`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${rover} manifest:`, error);
    throw error;
  }
};