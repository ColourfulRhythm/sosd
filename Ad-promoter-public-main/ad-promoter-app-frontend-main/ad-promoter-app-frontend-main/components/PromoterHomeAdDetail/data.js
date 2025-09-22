import profile from '../../public/assets/Profil.svg';
import rabbitImage from '@/public/assets/Component-66.png';
import spaceImage from '@/public/assets/Component-69.png';

export const directlinkAd = [
  {
    product: 'Mastery cakes and pastery',
    type: 'Directlink Ad',
    tags: ['confectionery', 'Food'],
    desc: 'At our store, you can get the best chocolate cakes at a super affordable price and with a customization on all our cakes. You also get a 50% discount on all cakespurchased in the next 48hrs.',
    price: '#25/visitor',
    aim: '1000 visitors',
    achieved: '10 visitors',
    userImg: profile,
    userName: 'Sharon Banjo',
    timePosted: '1 hour ago',
  },
];

export const visualAd = [
  {
    product: 'Mastery cakes and pastery',
    type: 'Visual Ad',
    tags: ['confectionery', 'Food'],
    desc: 'At our store, you can get the best chocolate cakes at a super affordable price and with a customization on all our cakes. You also get a 50% discount on all cakespurchased in the next 48hrs.',
    price: '#25/video',
    aim: '1000 videos',
    achieved: '10 videos',
    userImg: profile,
    userName: 'Sharon Banjo',
    timePosted: '1 hour ago',
    productImg: [
      {
        url: rabbitImage,
        title: 'rabbit',
      },
      {
        url: spaceImage,
        title: 'space',
      },
    ],
  },
];

export const detailsAd = [
  {
    product: 'Mastery cakes and pastery',
    type: 'Details Ad',
    tags: ['confectionery', 'Food'],
    desc: 'We sell all kinds of pets, with different breeds, sizes and color. We also deal in giving various type of vaccination to your pets and also mating services. You also get a 50% discount on all cakespurchased',
    price: '#25/Conv.',
    aim: '1000/Conv.',
    achieved: '10 Conv',
    userImg: profile,
    userName: 'Sharon Banjo',
    timePosted: '1 hour ago',
    productImg: [
      {
        url: spaceImage,
        title: 'space',
      },
      {
        url: rabbitImage,
        title: 'rabbit',
      },
    ],
  },
];
