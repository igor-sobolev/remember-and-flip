export const countdownRenderer = ({ seconds, completed }: { seconds: number; completed: boolean }): string | number => {
  if (completed) {
    // Render a completed state
    return 'Prepare !';
  } else {
    // Render a countdown
    return seconds;
  }
};
