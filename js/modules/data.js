import {
  getRandomNumber,
  getRandomElementArray,
  getRandomElementsArray
} from './lib';

const NUMBER_AVATAR_LOWER = 1;
const NUMBER_AVATAR_UPPER = 8;
const NUMBER_OFFER = 25;
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const APARTMENTS = [
  {
    type: 'bungalow',
    price: 0,
  }, {
    type: 'flat',
    price: 1000,
  }, {
    type: 'house',
    price: 5000,
  }, {
    type: 'palace',
    price: 10000,
  },
];
const MAX_PRICE_VALUE = 1000000;
const NUMBER_GUESTS = ['100', '1', '2', '3'];

const getRandomAvatar = function () {
  const index = getRandomNumber(NUMBER_AVATAR_LOWER, NUMBER_AVATAR_UPPER);

  return `img/avatars/user0${index}.png`;
};

const generateMockObject = function () {
  const randomX = getRandomNumber(35.65000, 35.70000, 5);
  const randomY = getRandomNumber(139.70000, 139.80000, 5);
  const checkTime = getRandomElementArray(CHECK_TIMES);

  return {
    author: {
      avatar: getRandomAvatar(),
    },
    offer: {
      title: '44 квадрата на Лубянке',
      address: `${randomX}, ${randomY}`,
      price: getRandomNumber(1, 10000),
      type: getRandomElementArray(APARTMENTS).type,
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: checkTime,
      checkout: checkTime,
      features: getRandomElementsArray(FEATURES),
      description: 'Как на Рублевке, только хуже.',
      photos: getRandomElementsArray(PHOTOS),
    },
    location: {
      x: Number(randomX),
      y: Number(randomY),
    },
  }
}

const getOffersList = function (count) {
  return new Array(count).fill(null).map(() => generateMockObject())
};

export {
  getOffersList,
  APARTMENTS,
  MAX_PRICE_VALUE,
  NUMBER_GUESTS,
  CHECK_TIMES,
  NUMBER_OFFER
};
