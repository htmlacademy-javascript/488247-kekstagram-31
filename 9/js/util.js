
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

export { getRandomInteger, createObjectsArray };
