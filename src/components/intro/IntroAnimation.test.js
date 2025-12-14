import { render, screen, act } from '@testing-library/react';
import IntroAnimation from './IntroAnimation';

/**
 * TESTING TIMING-BASED COMPONENTS
 *
 * IntroAnimation uses setTimeout for its phase transitions.
 * We use Jest's "fake timers" to control time in tests.
 *
 * jest.useFakeTimers() - Replace real setTimeout with fake version
 * jest.advanceTimersByTime(3500) - Jump forward 3.5 seconds instantly
 * jest.useRealTimers() - Restore normal timers after test
 */

describe('IntroAnimation', () => {
  // Run before each test to set up fake timers
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Run after each test to clean up
  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders without crashing', () => {
    const mockOnFinish = jest.fn(); // Create a fake function
    render(<IntroAnimation onFinish={mockOnFinish} />);

    // If we get here, it rendered successfully
    expect(screen.getByText('Shake It Up')).toBeInTheDocument();
  });

  test('starts in drawing phase', () => {
    const mockOnFinish = jest.fn();
    render(<IntroAnimation onFinish={mockOnFinish} />);

    // The logo should be visible immediately
    expect(screen.getByText('Shake It Up')).toBeInTheDocument();
  });

  test('calls onFinish callback after full animation sequence', () => {
    // Create a mock function to track if onFinish was called
    const mockOnFinish = jest.fn();

    render(<IntroAnimation onFinish={mockOnFinish} />);

    // Initially, onFinish should NOT be called
    expect(mockOnFinish).not.toHaveBeenCalled();

    // Fast-forward through the entire animation
    // 5400ms (reveal starts) + 800ms (fade out) = 6200ms total
    // Wrap in act() because it causes React state updates
    act(() => {
      jest.advanceTimersByTime(6200);
    });

    // Now onFinish should have been called exactly once
    expect(mockOnFinish).toHaveBeenCalledTimes(1);
  });

  test('does not call onFinish too early', () => {
    const mockOnFinish = jest.fn();
    render(<IntroAnimation onFinish={mockOnFinish} />);

    // Fast-forward only 3 seconds (should still be in drawing phase)
    // Wrap in act() because it causes React state updates
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // onFinish should NOT be called yet
    expect(mockOnFinish).not.toHaveBeenCalled();
  });

  test('cleans up timers on unmount', () => {
    const mockOnFinish = jest.fn();
    const { unmount } = render(<IntroAnimation onFinish={mockOnFinish} />);

    // Unmount the component (like when user navigates away)
    unmount();

    // Fast-forward time
    // Wrap in act() for consistency
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // onFinish should NOT be called because component was unmounted
    expect(mockOnFinish).not.toHaveBeenCalled();
  });
});
