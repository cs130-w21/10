import { render, screen } from '@testing-library/react';
import Profile from '../components/Profile';
import { useAuthMock } from '../mocks/setupTests';

const auth = require('../services/AuthContext');
describe('test profile page', () => {
  let mockAuth;
  beforeEach(() => {
    mockAuth = jest.spyOn(auth,
      'useAuth').mockImplementation(useAuthMock);
  });
  afterEach(() => {
    mockAuth.mockRestore();
  });
  test('render profile: check if fields are present', () => {
    render(<Profile />);
    const fields = screen.getAllByText(/Bio/i);
    expect(fields[0]).toBeInTheDocument();
    const interests = screen.getAllByText(/Interest/i);
    expect(interests[0]).toBeInTheDocument();
  });
});