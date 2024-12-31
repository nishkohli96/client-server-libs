import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import { pokeApi } from '@/axios/pokeApi';

/**
 * Dynamically generated metadata for the page.
 * It can also accept searchParams as a prop.
 * The function will always be async.
 */
/* eslint-disable require-await */
export async function generateMetadata({
  params: { id }
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: id.charAt(0).toUpperCase() + id.slice(1),
    description: `Details for ${id}`,
  };
}

/**
 * Here "id" is [id], the route param being provided
 * in App Router. It would throw undefined if any other
 * variable instead of id would have been used.
 */
export default async function PokemonDetails({ params: { id } }: {
  params: { id: string };
}) {
  async function pokemonDetails() {
    try {
      const pokemonDetails = await pokeApi.get(`pokemon/${id}`);
      console.log('pokemonDetails: ', pokemonDetails.data);
      return true;
    } catch (error) {
      console.log('fetching error', error);
      return false;
    }
  }
  const success = await pokemonDetails();
  return (
    <main>
      {success ? (
        <Typography variant="body1">
          {`Check console to view details for ${id.toUpperCase()}`}
        </Typography>
      ) : (
        <Typography variant="body2" color="error">
          {`No details found for ${id}`}
        </Typography>
      )}
    </main>
  );
}
