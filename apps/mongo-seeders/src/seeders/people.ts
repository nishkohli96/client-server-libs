import { PersonModel } from '@/models/Person';

const peopleList = [
  {
    id: 1,
    fullName: 'Rand Snelling',
    email: 'rsnelling0@unicef.org',
    gender: 'MALE',
    weight: 58,
    city: 'Shuanghe'
  },
  {
    id: 2,
    fullName: 'Odey Fidler',
    email: 'ofidler1@theglobeandmail.com',
    gender: 'MALE',
    weight: 88,
    city: 'Kungälv'
  },
  {
    id: 3,
    fullName: 'Carson Mooney',
    email: 'cmooney2@yelp.com',
    gender: 'MALE',
    weight: 42,
    city: 'Kaiaf'
  },
  {
    id: 4,
    fullName: 'Bryan Fosdyke',
    email: 'bfosdyke3@nyu.edu',
    gender: 'MALE',
    weight: 64,
    city: 'Loshnitsa'
  },
  {
    id: 5,
    fullName: 'Byrom Spensly',
    email: 'bspensly4@edublogs.org',
    gender: 'MALE',
    weight: 57,
    city: 'Inyati'
  },
  {
    id: 6,
    fullName: 'Lyn Hugnot',
    email: 'lhugnot5@histats.com',
    gender: 'MALE',
    weight: 40,
    city: 'Kokaj'
  },
  {
    id: 7,
    fullName: 'Thaddus McCrostie',
    email: 'tmccrostie6@skyrock.com',
    gender: 'MALE',
    weight: 91,
    city: 'San Javier'
  },
  {
    id: 8,
    fullName: 'Joseph Jahns',
    email: 'jjahns7@shareasale.com',
    gender: 'MALE',
    weight: 74,
    city: 'Võhma'
  },
  {
    id: 9,
    fullName: 'Bernhard Senogles',
    email: 'bsenogles8@desdev.cn',
    gender: 'MALE',
    weight: 74,
    city: 'Wulan Haye'
  },
  {
    id: 10,
    fullName: 'Vinny Gerald',
    email: 'vgerald9@cloudflare.com',
    gender: 'FEMALE',
    weight: 88,
    city: 'Tomarovka'
  },
  {
    id: 11,
    fullName: 'Sada Scardefield',
    email: 'sscardefielda@cpanel.net',
    gender: 'FEMALE',
    weight: 45,
    city: 'Carvalhal'
  },
  {
    id: 12,
    fullName: 'Desdemona Chasteau',
    email: 'dchasteaub@marriott.com',
    gender: 'FEMALE',
    weight: 46,
    city: 'Uzyn'
  },
  {
    id: 13,
    fullName: 'Miof mela Spadollini',
    email: 'mmelac@archive.org',
    gender: 'FEMALE',
    weight: 51,
    city: 'Parys'
  },
  {
    id: 14,
    fullName: 'Winnie Pieracci',
    email: 'wpieraccid@google.co.uk',
    gender: 'FEMALE',
    weight: 44,
    city: 'Mentougou'
  },
  {
    id: 15,
    fullName: 'Carrie Bearcock',
    email: 'cbearcocke@wordpress.org',
    gender: 'FEMALE',
    weight: 100,
    city: 'Richmond'
  }
];

export const seedPeople = async () => {
  console.log('Truncating People Collection...');
  await PersonModel.deleteMany({});
  await PersonModel.insertMany(peopleList);
  console.log('Added data in People collection!');
};
