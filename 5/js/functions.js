function isValidString(str, length) {
  return str.length <= length;
}

function isPalindrome(str) {
  const normalizedStr = str.toLowerCase().replaceAll(' ', '');
  const reversedStr = [...normalizedStr].reverse().join('');
  return normalizedStr === reversedStr;
}

function stringToNumber(str) {
  return Number([...str].filter((item) => !isNaN(parseInt(item, 10))).join('') || NaN
  );
}

isValidString('проверяемая строка', 20);

isPalindrome('Лёша на полке клопа нашёл ');

stringToNumber('1 кефир, 0.5 батона');
