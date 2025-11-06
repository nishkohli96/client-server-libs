type PageInfo = {
  title: string;
  href: string;
};

const stripePrefix = '/stripe';

export const PageLinks: PageInfo[] = [
  {
    title: 'DatoCMS',
    href: '/dato-cms'
  },
  {
    title: 'Pokemons',
    href: '/pokemon'
  },
  {
    title: 'Parallel Routes',
    href: '/parallel-routes'
  },
  {
    title: 'Data Table',
    href: '/datatable'
  },
  {
    title: 'MDX with Translations',
    href: '/mdx'
  },
  {
    title: 'Location',
    href: '/location'
  },
  {
    title: 'Stripe',
    href: stripePrefix
  },
  {
    title: 'Next Auth',
    href: '/login'
  },
  {
    title: 'Firebase',
    href: '/firebase'
  },
  {
    title: 'Browser Info',
    href: '/browser'
  },
];
