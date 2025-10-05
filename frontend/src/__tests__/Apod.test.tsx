import React from 'react';
import { render, screen } from '@testing-library/react';
import ApodComponent from '../components/Apod';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      title: 'Test Image',
      url: 'https://example.com/test.jpg',
      explanation: 'This is a test image',
      date: '2025-10-05',
      media_type: 'image'
    }),
    ok: true,
  } as Response)
) as jest.Mock;

test('renders loading state initially', () => {
  render(<ApodComponent />);
  const loadingElement = screen.getByText(/Loading today's cosmic image/i);
  expect(loadingElement).toBeInTheDocument();
});