import CrystallineGiant from '@app/components/crystallineGiant';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import '@testing-library/jest-dom/extend-expect';

test('renders or something', () => {
  render(<CrystallineGiant initialAbility="+1/+1" />);

  expect(screen.getByText('li')).toHaveTextContent('');
});
