import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

test('renders Order Management Dashboard', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/Order Management Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
