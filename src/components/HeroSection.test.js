import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from './HeroSection';

/**
 * TESTING VIDEO COMPONENTS
 *
 * This shows how to test components with media elements (video, audio).
 * We simulate events like 'error' and 'loadeddata' using fireEvent.
 *
 * fireEvent.error(element) - Simulates video loading failure
 * fireEvent.loadedData(element) - Simulates successful video load
 */

describe('HeroSection', () => {
  test('renders without crashing', () => {
    render(<HeroSection />);

    // Component should render successfully
    expect(screen.getByText('Welcome to the Experience')).toBeInTheDocument();
  });

  test('displays welcome text', () => {
    render(<HeroSection />);

    // Check that the main heading is visible
    const heading = screen.getByText('Welcome to the Experience');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1'); // Verify it's an h1 element
  });

  test('renders video element with correct attributes', () => {
    render(<HeroSection />);

    // Find the video element
    const video = document.querySelector('video');

    // Verify video exists and has correct attributes
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', '/assets/0000-0720.mp4');

    // Boolean attributes in React become properties, not always attributes
    // Check the actual properties instead
    expect(video.loop).toBe(true);
    expect(video.muted).toBe(true);
  });

  test('does not show error message initially', () => {
    render(<HeroSection />);

    // Error message should NOT be visible initially
    const errorMessage = screen.queryByText(/video failed to load/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('displays error message when video fails to load', () => {
    // Mock console.error to avoid cluttering test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<HeroSection />);

    // Find the video element
    const video = document.querySelector('video');

    // Simulate video loading error
    fireEvent.error(video);

    // Now error message should be visible
    const errorMessage = screen.getByText(/video failed to load/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyle({ color: 'white', background: 'red' });

    // Verify console.error was called
    expect(consoleSpy).toHaveBeenCalledWith('Video failed to load:', expect.anything());

    // Clean up the spy
    consoleSpy.mockRestore();
  });

  test('logs success message when video loads', () => {
    // Mock console.log to verify it's called
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<HeroSection />);

    // Find the video element
    const video = document.querySelector('video');

    // Simulate successful video load
    fireEvent.loadedData(video);

    // Verify console.log was called with success message
    expect(consoleSpy).toHaveBeenCalledWith('Video loaded successfully');

    // Clean up the spy
    consoleSpy.mockRestore();
  });
});
