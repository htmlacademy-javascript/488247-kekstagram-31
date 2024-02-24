const QUANTITY = 25;

const NAMES = [
  'Maria',
  'Maksim',
  'Ariana',
  'Robert',
  'Daria',
  'Kirill',
];

const DESCRIPTIONS = [
  'Отель "Eden", Хорватия',
  'Go to the beach',
  'Пляж у отеля "Phoenix Hotel Karon Beach" ',
  'Пляжный фотограф :)',
  'Тот самый случай, когда еда смотрит на тебя',
  'McLaren 650s Lamborghini',
  'Блюдце с клубникой',
  'Бокалы с домашним киселём',
  'Самолёт пролетающий низко над пляжем',
  'Калошница под шкафом',
  'Дорожка к морю',
  'AUDI A5',
  'Овощная нарезка',
  'Котбургер',
  'Кто то сушит тапки',
  'Высоко над облаками',
  'Xор мальчиков-зайчиков ',
  'Ford Fairlane',
  'Тапочки с фарами',
  'Отель "L\' Amphitrite Palace Resort & Spa", Марокко',
  'Блюдо с долькою лайма',
  'Закат на пляже',
  'Краб',
  'Да это же концерт группы "Руки вверх"!',
  'В гости к гиппопотаму',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Avatars = {
  MIN: 1,
  MAX: 6,
};

const Comments = {
  MIN: 0,
  MAX: 30,
};

const photos = [];

const getRandomInteger = (min, max) => {
  const lower = Math.floor(Math.min(min, max));
  const upper = Math.ceil(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const addComment = (id) => ({
  id,
  avatar: `./img/avatar-${getRandomInteger(Avatars.MIN, Avatars.MAX)}.svg`,
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
});

const addComments = () => {
  let id = 4518963;
  const createCommentsArray = () => {
    const comments = [];
    for (let i = 0; i < getRandomInteger(Comments.MIN, Comments.MAX); i++) {
      comments.push(addComment(id += 1));
    }
    return comments;
  };
  return createCommentsArray;
};

const addCommentsToPhoto = addComments();

const addPhoto = (id) => ({
  id,
  url: `./photos/${id}.jpg`,
  description: DESCRIPTIONS[id - 1],
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: addCommentsToPhoto(),
});

const addPhotos = () => {
  for (let i = 1; i <= QUANTITY; i++) {
    photos.push(addPhoto(i));
  }
};

addPhotos();
