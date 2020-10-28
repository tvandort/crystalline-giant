import { CrystallineGiant } from '@app/logic/crystallineGiant';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const card = new CrystallineGiant();

export default function Home() {
  const [abilities, setAbilities] = useState(card.Abilities);

  return (
    <div>
      Your Crystalline Giant:
      <button
        onClick={() => {
          card.gainAbility();
          setAbilities(card.Abilities);
        }}
      >
        Gain Ability
      </button>
      <ul>
        {abilities.map((ability) => (
          <li key={ability}>{ability}</li>
        ))}
      </ul>
    </div>
  );
}
