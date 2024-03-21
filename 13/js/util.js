
const getRandomInteger = (min, max) => {
  min = Math.ceil(Math.min(min, max));
  max = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createObjectsArray = (addObject, arraySize) => {
  const objectsArray = [];
  for (let i = 0; i < arraySize; i++) {
    objectsArray.push(addObject());
  }
  return objectsArray;
};

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, createObjectsArray, isEscapeKey, numDecline };
