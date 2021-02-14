import { random, sample, sampleSize } from 'lodash';

export const getRandomNumber = function (min, max, decimal) {
  return random(min, max).toFixed(decimal);
}

export const getRandomElementArray = function (array) {
  return sample(array);
}

export const getRandomElementsArray = function (array) {
  const count = getRandomNumber(0, array.length - 1);

  return sampleSize(array, count);
}
