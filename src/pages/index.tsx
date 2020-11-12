import { Ability, AllAbilities, Pick } from '@app/logic/crystallineGiant';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import CrystallineGiant from '../components/crystallineGiant';

interface HomeProps {
  initialAbility: Ability;
}

export default function Home({ initialAbility }: HomeProps) {
  return <CrystallineGiant initialAbility={initialAbility} />;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return {
    props: {
      initialAbility: Pick(AllAbilities)
    }
  };
};
