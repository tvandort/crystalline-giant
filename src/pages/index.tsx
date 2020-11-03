import {
  Ability,
  AllAbilities,
  CrystallineGiant,
  CrystallineGiantInitializer,
  CrystallineGiantReducer,
  Pick
} from '@app/logic/crystallineGiant';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useReducer, useState } from 'react';

interface HomeProps {
  initialAbility: Ability;
}

export default function Home({ initialAbility }: HomeProps) {
  const [card, dispatch] = useReducer<typeof CrystallineGiantReducer>(
    CrystallineGiantReducer,
    CrystallineGiantInitializer(initialAbility)
  );

  return (
    <div>
      Your Crystalline Giant:&nbsp;
      <button
        onClick={() => {
          dispatch('GAIN_ABILITY');
        }}
        disabled={!card.canGainAbility}
      >
        Roll
      </button>
      <ul>
        {card.gained.map((ability) => (
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
          setAbilities(card.Abilities);
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
