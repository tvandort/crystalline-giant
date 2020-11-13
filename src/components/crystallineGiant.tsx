import React, { useState } from 'react';
import {
  CrystallineGiantInitializer,
  CrystallineGiantReducer,
  CrystallineGiant as CrystallineGiantState,
  AllAbilities,
  Ability
} from '@app/logic/crystallineGiant';
import { useReducer } from 'react';

const lastAbility = AllAbilities[9];

const View = () => {
  const [selectedAbility, setSelectedAbility] = useState<Ability | ''>('');
  const card = useCrystallineGiant();

  return (
    <div>
      Crystalline Giant:&nbsp;
      <button
        onClick={() => {
          card.gainAbility();
        }}
        disabled={!card.CanGainAbility}
        title={
          card.CanGainAbility
            ? 'Roll to gain another ability.'
            : 'Cannot roll; all abilities gained.'
        }
      >
        Roll
      </button>
      &nbsp;
      <button
        onClick={() => {
          if (selectedAbility !== '') {
            card.addAbility(selectedAbility);
          }
        }}
        disabled={!card.CanGainAbility || selectedAbility === ''}
        title={
          card.CanGainAbility
            ? 'Click to manually add an ability.'
            : 'Cannot gain any more abilities.'
        }
      >
        Add Ability
      </button>
      &nbsp;
      <select
        onBlur={({ target: { value } }) => setSelectedAbility(value as Ability)}
        onChange={({ target: { value } }) =>
          setSelectedAbility(value as Ability)
        }
        value={selectedAbility}
      >
        <option value=""></option>
        {card.UngainedAbilities.map((ability) => (
          <option key={ability} value={ability}>
            {ability}
          </option>
        ))}
      </select>
      &nbsp;
      <button
        onClick={() => {
          card.reset();
          setSelectedAbility('');
        }}
      >
        Reset
      </button>
      <ul>
        {card.Abilities.map((ability) => (
          <li key={ability}>{ability}</li>
        ))}
      </ul>
    </div>
  );
};

export default View;

function useCrystallineGiant() {
  const [state, dispatch] = useReducer(
    CrystallineGiantReducer,
    CrystallineGiantInitializer()
  );
  const card = new CrystallineGiantState(state, dispatch);
  return card;
}
