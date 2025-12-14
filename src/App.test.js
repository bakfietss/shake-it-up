import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * WHAT IS THIS FILE?
 * This file contains automated tests that verify your App component works correctly.
 * Tests run with: npm test
 *
 * WHY TEST?
 * - Catches bugs automatically before users see them
 * - Ensures changes don't break existing features
 * - Documents how your code should behave
 */

test('renders the app without crashing', () => {
  // This is the most basic test - does the component render at all?
  render(<App />);

  // If we get here without errors, the test passes!
  // This catches issues like syntax errors or missing imports
});

test('shows intro animation on initial load', () => {
  // Render the App component
  render(<App />);

  // Look for text that appears in IntroAnimation
  const introText = screen.getByText(/shake it up/i);

  // Verify it's in the document
  expect(introText).toBeInTheDocument();
});

test('shows hero section on initial load', () => {
  // Render the App component
  render(<App />);

  // Look for text from HeroSection
  const heroText = screen.getByText(/welcome to the experience/i);

  // Verify it's in the document (even though intro is on top)
  expect(heroText).toBeInTheDocument();
});
