import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn Jenkins link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Example Link/i);
  expect(linkElement).toBeInTheDocument();
});
