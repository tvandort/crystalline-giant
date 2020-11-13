import React from 'react';
import CrystallineGiant from '@app/components/crystallineGiant';
import { render, screen } from '@testing-library/react';

test('renders or something', () => {
  render(<CrystallineGiant initialAbility="+1/+1" />);

  expect(screen.getByText('+1/+1')).toBeTruthy();
});
