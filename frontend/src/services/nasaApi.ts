// NASA API Service
const NASA_API_BASE = '/api';

// Fetch Astronomy Picture of the Day
export const fetchApod = async () => {
  try {
    const response = await fetch(`${NASA_API_BASE}/apod`);
    console.log(`API response status: ${response.status}`);
    
    if (!response.ok) {
      let errorMessage = `Failed to fetch APOD data. Status: ${response.status}`;
      
      try {
        const errorData = await response.json();
        console.log('API error data:', errorData);
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (parseError) {
        // If we can't parse the error response as JSON, try as text
        try {
          const errorText = await response.text();
          console.log('API error text:', errorText);
          if (errorText) {
            errorMessage = errorText;
          }
        } catch (textError) {
          // If we can't get text either, use the default message
        }
      }
      
      if (response.status === 429) {
        throw new Error('NASA API rate limit exceeded. Your API key may have reached its limit.');
      }
      
      if (response.status >= 500) {
        throw new Error('There was a server error fetching data from NASA. Please try again later.');
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log('API response data:', data);
    
    // Check if NASA API returned an error object
    if (data.error) {
      if (data.message && data.message.includes('rate limit')) {
        throw new Error('NASA API rate limit exceeded. Your API key may have reached its limit.');
      }
      throw new Error(data.message || data.error || 'Failed to fetch APOD data');
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchApod:', error);
    throw error;
  }
};

// Fetch Mars Rover Photos
export const fetchMarsPhotos = async (rover: string, date: string) => {
  try {
    const response = await fetch(`${NASA_API_BASE}/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}`);
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('NASA API rate limit exceeded. Your API key may have reached its limit.');
      }
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
    const response = await fetch(`${NASA_API_BASE}/mars-photos/api/v1/rovers/${rover}`);
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('NASA API rate limit exceeded. Your API key may have reached its limit.');
      }
      throw new Error(`Failed to fetch ${rover} manifest`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${rover} manifest:`, error);
    throw error;
  }
};