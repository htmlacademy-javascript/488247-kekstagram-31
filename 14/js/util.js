const GenitiveSingular = {
  TOP: 20,
  BOTTOM: 5,
};

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (
    num % 10 === 0
    || num % 100 >= GenitiveSingular.BOTTOM
    && num % 100 <= GenitiveSingular.TOP
  ) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, numDecline };
