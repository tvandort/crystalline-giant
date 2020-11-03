import {
  Ability,
  AllAbilities,
  CrystallineGiantInitializer,
  CrystallineGiantReducer,
  CrystallineGiantWrapper,
  Pick
} from '@app/logic/crystallineGiant';
import { useLocalStorage } from '@app/logic/useLocalStorage';
import { stat } from 'fs';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useReducer } from 'react';

interface HomeProps {
  initialAbility: Ability;
}

export default function Home({ initialAbility }: HomeProps) {
  const card = useCrystallineGiant(initialAbility);

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

const useCrystallineGiant = (initialAbility: Ability) => {
  const [stored, setStored] = useLocalStorage(
    'giant',
    CrystallineGiantInitializer(initialAbility)
  );
  const [state, dispatch] = useReducer(CrystallineGiantReducer, stored);

  useEffect(() => {
    setStored(state);
  }, [setStored, state]);

  return new CrystallineGiantWrapper(state, dispatch);
};
