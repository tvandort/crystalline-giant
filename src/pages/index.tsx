import {
  Ability,
  AllAbilities,
  CrystallineGiant,
  Pick
} from '@app/logic/crystallineGiant';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

interface HomeProps {
  initialAbility: Ability;
}

export default function Home({ initialAbility }: HomeProps) {
  const [card] = useState(new CrystallineGiant({ initialAbility }));
  const [abilities, setAbilities] = useState(card.Abilities);

  return (
    <div>
      Your Crystalline Giant:&nbsp;
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return {
    props: {
      initialAbility: Pick(AllAbilities)
    }
  };
};