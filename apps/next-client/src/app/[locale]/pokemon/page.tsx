import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import MenuItem from '@mui/material/MenuItem';
import variables from './styles.module.scss';

type Pokemon = {
  name: string;
  url: string;
};

type PokeApiResult = {
  results: Pokemon[];
};

/**
 * By setting the title as "absolute", the template will not be used
 */
export const metadata: Metadata = {
  title: {
    absolute: 'Pokemon List'
  }
};

async function getData() {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=15&offset=0'
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function PokemonList() {
  const data: PokeApiResult = await getData();
  /* Returns the currently applied locale */
  const locale = await getLocale();
  const t = await getTranslations('PokemonPage');

  return (
    <main>
      <p style={{ color: variables.primaryColor }}>
        {`Selected locale: ${locale}`}
      </p>
      <p>
        {t('list')}
      </p>
      {data.results.map((pokemon, idx) => (
        <MenuItem key={idx}>
          <Link href={`/pokemon/${pokemon.name}`}>
            {pokemon.name}
          </Link>
        </MenuItem>
      ))}
    </main>
  );
}
