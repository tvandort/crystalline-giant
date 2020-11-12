import {
  Ability,
  AllAbilities,
  CrystallineGiantTester,
  CrystallineGiantInitializer,
  CrystallineGiantReducer,
  CrystallineGiant,
  Pick
} from '@app/logic/crystallineGiant';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useReducer, useState } from 'react';

interface HomeProps {
  initialAbility: Ability;
}

export default function Home({ initialAbility }: HomeProps) {
  const [state, dispatch] = useReducer(
    CrystallineGiantReducer,
    CrystallineGiantInitializer(initialAbility)
  );
  const card = new CrystallineGiant(state, dispatch);

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
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return {
    props: {
      initialAbility: Pick(AllAbilities)
    }
  };
};
