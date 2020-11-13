import React from 'react';
import {
  Ability,
  CrystallineGiantInitializer,
  CrystallineGiantReducer,
  CrystallineGiant as CrystallineGiantState
} from '@app/logic/crystallineGiant';
import { useReducer } from 'react';

const View = () => {
  const card = useCrystallineGiant();

  return (
    <div>
      Your Crystalline Giant:&nbsp;
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
      <ul>
        {card.Abilities.map((ability) => (
          <li key={ability}>{ability}</li>
        ))}
      </ul>
      <br />
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          card.reset();
        }}
      >
        Reset
      </button>
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
