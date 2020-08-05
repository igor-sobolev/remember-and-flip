import { countdownRenderer } from './countdownRenderer';

describe('Given with countdownRenderer function', () => {
  it('should return seconds when not completed', () => {
    expect(countdownRenderer({ seconds: 5, completed: false })).toBe(5);
  });

  it('should return Prepare! when not completed', () => {
    expect(countdownRenderer({ seconds: 5, completed: true })).toBe('Prepare!');
  });
});
