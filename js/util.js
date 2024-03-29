const RERENDER_DELAY = 500;

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

const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, numDecline, debounce };
