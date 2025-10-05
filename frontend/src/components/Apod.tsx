import React, { useState, useEffect } from 'react';
import { Apod } from '../interfaces/Apod';
import './Apod.css';

const ApodComponent: React.FC = () => {
  const [apodData, setApodData] = useState<Apod | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await fetch('/api/apod');
        if (!response.ok) {
          throw new Error('Failed to fetch APOD data');
        }
        const data: Apod = await response.json();
        setApodData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load Astronomy Picture of the Day');
        setLoading(false);
      }
    };

    fetchApod();
  }, []);

  if (loading) return <div className="apod-loading">Loading today's cosmic image...</div>;
  if (error) return <div className="apod-error">{error}</div>;
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