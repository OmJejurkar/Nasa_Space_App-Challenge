import React, { useState, useEffect } from 'react';
import { Apod } from '../interfaces/Apod';
import { fetchApod } from '../services/nasaApi';
import './Apod.css';

const ApodComponent: React.FC = () => {
  const [apodData, setApodData] = useState<Apod | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching APOD data...');
        const data = await fetchApod();
        console.log('Received APOD data:', data);
        
        // Check if the response contains an error from NASA API
        if (data.error) {
          throw new Error(data.error);
        }
        
        setApodData(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching APOD:', err);
        if (err.message) {
          setError(`Error: ${err.message}`);
        } else {
          setError('Failed to load Astronomy Picture of the Day. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="apod-loading">Loading today's cosmic image...</div>;
  if (error) return (
    <div className="apod-error">
      <h3>Error Loading APOD</h3>
      <p>{error}</p>
      <p className="apod-error-help">
        If you've added your NASA API key and are still seeing this error, please check:
        <br />1. That your backend server is running
        <br />2. That your API key is valid and correctly formatted in the backend .env file
        <br />3. Your internet connection
      </p>
    </div>
  );
  if (!apodData) return <div className="apod-empty">No data available</div>;

  return (
    <div className="apod-container">
      <h2>Astronomy Picture of the Day</h2>
      <h3>{apodData.title}</h3>
      <p className="apod-date">{apodData.date}</p>
      {apodData.media_type === 'image' ? (
        <img src={apodData.url} alt={apodData.title} className="apod-image" />
      ) : (
        <iframe 
          src={apodData.url} 
          title={apodData.title}
          className="apod-video"
          frameBorder="0"
          allowFullScreen
        />
      )}
      <p className="apod-explanation">{apodData.explanation}</p>
      {apodData.copyright && (
        <p className="apod-copyright">© {apodData.copyright}</p>
      )}
    </div>
  );
};

export default ApodComponent;