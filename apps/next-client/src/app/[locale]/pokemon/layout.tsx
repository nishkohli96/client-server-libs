import type { Metadata } from 'next';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Pokemons',
  description: 'List of pokemons'
};

export default function PokemonPageLayout({ children }: LayoutProps) {
  return (
    <div
      style={{
        background: '#3d3d3d',
        padding: '10px',
        borderRadius: 2
      }}
    >
      {children}
    </div>
  );
}
