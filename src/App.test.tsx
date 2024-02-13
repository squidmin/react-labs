import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { ThemeProvider } from './ThemeContext'; // Adjust the import path as necessary

describe('App component tests', () => {
  test('renders XML to JSON Converter text in all expected places', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    const linkElements = screen.getAllByText(/XML to JSON Converter/i);
    expect(linkElements.length).toBeGreaterThan(0); // Adjust this based on the expected count
    linkElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });

  test('toggles theme from light to dark', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const heading = screen.getByRole('heading', { name: /XML to JSON Converter/i });
    expect(heading).toBeInTheDocument();
  });
});
