// Authors: Sophia, Eli, Damian, Matthew and Abraham
// Date: 2/13/25
// Last Modified: 2/16/25
// Purpose: Test to ensure the app is compiling and running correctly.

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
