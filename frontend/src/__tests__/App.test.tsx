import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders CosmicVista title in h1', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: /CosmicVista/i, level: 1 });
  expect(titleElement).toBeInTheDocument();
});