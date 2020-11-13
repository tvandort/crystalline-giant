import React from 'react';
import CrystallineGiant from '@app/components/crystallineGiant';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AllAbilities } from '@app/logic/crystallineGiant';

test('renders or something', () => {
  render(<CrystallineGiant />);

  const roll = screen.getByText('Roll');

  userEvent.click(roll);

  let abilityListItem;
  for (var ability of AllAbilities) {
    abilityListItem = screen.queryByText(ability);
    if (abilityListItem) {
      break;
    }
  }

  expect(abilityListItem).toBeTruthy();
});

test('roll is disabled when there are no more abilities left', () => {
  render(<CrystallineGiant />);

  const rollButton = screen.getByText('Roll');

  for (let i = 0; i < 10; i++) {
    userEvent.click(rollButton);
  }

  expect(rollButton).toBeDisabled();
});

test('reset enables roll', () => {
  render(<CrystallineGiant />);

  const rollButton = screen.getByText('Roll');

  for (let i = 0; i < 10; i++) {
    userEvent.click(rollButton);
  }

  expect(rollButton).toBeDisabled();

  userEvent.click(screen.getByText('Reset'));

  expect(rollButton).not.toBeDisabled();
});

xit('reset removes abilities', async () => {
  render(<CrystallineGiant />);

  const rollButton = screen.getByText('Roll');

  for (let i = 0; i < 10; i++) {
    userEvent.click(rollButton);
  }

  const roll = screen.getByText('Roll');

  userEvent.click(roll);

  for (let ability of AllAbilities) {
    const abilityListItem = screen.getByText(ability);
    expect(abilityListItem).toBeTruthy();
  }

  userEvent.click(screen.getByText('Reset'));

  for (let ability of AllAbilities) {
    const abilityListItem = screen.queryByText(ability);
    expect(abilityListItem).toBeFalsy();
  }
});
