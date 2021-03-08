import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders capitalist hinge app', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Capitalist Hinge/i);
  expect(linkElement[0]).toBeInTheDocument();
  const login = screen.getByText(/Login/i);
  expect(login).toBeInTheDocument();
});
