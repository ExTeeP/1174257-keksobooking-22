const NUMBER_AVATAR_LOWER = 1;
const NUMBER_AVATAR_UPPER = 8;
const NUMBER_OFFER = 10;
const RENTAL_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const getRandomNumber = function (min, max, decimal) {
  return _.random(min, max).toFixed(decimal);
}

const getRandomAvatar = function () {
  const index = getRandomNumber(NUMBER_AVATAR_LOWER, NUMBER_AVATAR_UPPER);

  return `img/avatars/user0${index}.png`;
};

const getRandomArray = function (array) {
  const count = getRandomNumber(0, array.length - 1);

  return _.sampleSize(array, count);
}

const generateMockObject = function () {
  const randomX = Number(getRandomNumber(35.65000, 35.70000, 5));
  const randomY = Number(getRandomNumber(139.70000, 139.80000, 5));

  return {
    author: {
      avatar: getRandomAvatar(),
    },
    offer: {
      title: '44 квадрата на Лубянке',
      address: `${randomX} ${randomY}`,
      price: _.random(1, 10000),
      type: _.sample(RENTAL_TYPES),
      rooms: _.random(1, 10),
      guests: _.random(1, 10),
      checkin: _.sample(CHECK_TIMES),
      checkout: _.sample(CHECK_TIMES),
      features: getRandomArray(FEATURES),
      description: 'Как на Рублевке, только хуже.',
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: randomX,
      y: randomY,
    },
  }
}

const getOffersList = function (count) {
  return new Array(count).fill(null).map(() => new generateMockObject)
};

getOffersList(NUMBER_OFFER);
