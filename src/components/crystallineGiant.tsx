import React, { useState } from 'react';
import {
  CrystallineGiantInitializer,
  CrystallineGiantReducer,
  CrystallineGiant as CrystallineGiantState,
  Ability
} from '@app/logic/crystallineGiant';
import { useReducer } from 'react';

const View = () => {
  const [selectedAbility, setSelectedAbility] = useState<Ability | ''>('');
  const card = useCrystallineGiant();

  const resetAnd = (action: () => void) => {
    setSelectedAbility('');
    action();
  };

  return (
    <div>
      Crystalline Giant:&nbsp;
      <button
        onClick={() => {
          card.rollAbility();
        }}
        disabled={!card.CanGainAbility}
        title="Roll to gain another ability."
      >
        Roll
      </button>
      &nbsp;
      <button
        onClick={() => {
          if (selectedAbility !== '') {
            resetAnd(() => card.addAbility(selectedAbility));
          }
        }}
        disabled={!card.CanGainAbility || selectedAbility === ''}
        title="Click to manually add an ability."
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
        disabled={!card.CanGainAbility}
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
          resetAnd(() => {
            card.undo();
          });
        }}
        disabled={!card.CanUndo}
      >
        Undo
      </button>
      &nbsp;
      <button
        onClick={() => {
          resetAnd(() => {
            card.reset();
          });
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
