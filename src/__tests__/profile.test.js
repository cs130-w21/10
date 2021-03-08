import { render, screen } from '@testing-library/react';
import Profile from '../components/Profile';
import { useAuthMock } from '../mocks/setupTests';
import renderer from 'react-test-renderer';
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
    const interest = screen.getByText(/Interest/i);
    expect(interest).toBeInTheDocument();
    const interestField = screen.getByText(/Business/i);
    const expertiseField = screen.getByText(/Agriculture/i);
    expect(interestField).toBeInTheDocument();
    expect(expertiseField).toBeInTheDocument();
  });
  test('snapshot test for profile page', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
  })
});