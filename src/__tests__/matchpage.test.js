import { render, screen } from '@testing-library/react';
import MatchCard from '../components/MatchPage/MatchCard';
import MatchPage from '../components/MatchPage/MatchPage';
import { useAuthMock } from '../mocks/setupTests';

const auth = require('../services/AuthContext');
describe('test match card', () => {
    let mockAuth;
    beforeEach(() => {
      mockAuth = jest.spyOn(auth,
        'useAuth').mockImplementation(useAuthMock);
    });
    afterEach(() => {
      mockAuth.mockRestore();
    });

    test('render page: check if fields are present', () => {
      render(<MatchPage />);
      const title = screen.getAllByText(/View Your Matches/);
      expect(title[0]).toBeInTheDocument();
      const matches = screen.getAllByText(/No matches found/);
      expect(matches[0]).toBeInTheDocument();
      expect(screen.getByRole("MatchPage")).toBeInTheDocument();
    });
  });