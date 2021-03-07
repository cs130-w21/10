import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { useAuthMock } from '../mocks/setupTests';

const auth = require('../services/AuthContext');
test('render app', () => {
  render(<App />);
});
// describe('test navbar', () => {
//   let mockAuth;
//   beforeEach(() => {
//     mockAuth = jest.spyOn(auth,
//       'useAuth').mockImplementation(useAuthMock);
//   });
//   afterEach(() => {
//     mockAuth.mockRestore();
//   });
//   test('render App: check if navbar functionality works', () => {
//     // render the whole app bc the navbar doesn't work without the router from the app
//     render(<App />);
//     const linkElement = screen.getAllByText(/Capitalist Hinge/i);
//     expect(linkElement[0]).toBeInTheDocument();
//     const link = screen.getByText(/Sign Out/i);
//     expect(link).toBeInTheDocument();
//     console.log(link);
//     console.log(fireEvent.click(screen.getByText(/Sign Out/i)));
//     expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
//   });
// });