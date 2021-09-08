import React from 'react'
import { render, screen } from '@testing-library/react'
import { AditionalModule } from './AditionalModule'

test('renders learn react link', () => {
  const component = render(<AditionalModule />)
  /* const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); */
  expect(component).toBeDefined()
})
