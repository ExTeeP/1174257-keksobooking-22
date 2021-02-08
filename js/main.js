const getRandomFloatRange = (max, min, float) => {

  if (max < 0 || min < 0) {
    throw new Error('Можно использовать только положительные числа.')
  }

  if (max <= min) {
    throw new Error('Максимальное значение должно быть больше минимального.')
  }

  const result = Math.random() * (max - min - 1) + min;

  return result.toFixed(float);
}

const getRandomIntRange = (max, min = 0) => {
  max = Math.floor(max);
  min = Math.ceil(min);

  return Number(getRandomFloatRange(max, min));
}
