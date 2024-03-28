import { numDecline } from './util.js';

const NUMBER_TO_LOAD_COMMENTS = 5;

const Avatar = {
  HEIGHT: 35,
  WIDTH: 35,
};

const bigPictureSocial = document.querySelector('.big-picture__social');
const socialCommentShownCount = bigPictureSocial.querySelector('.social__comment-shown-count');
const socialCommentCount = bigPictureSocial.querySelector('.social__comment-count');
const commentLoader = bigPictureSocial.querySelector('.comments-loader');

const createComment = (comment, container) => {
  const { avatar, name, message } = comment;
  const listItem = document.createElement('li');
  listItem.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.height = Avatar.HEIGHT;
  img.width = Avatar.WIDTH;

  const paragraph = document.createElement('p');
  paragraph.classList.add('social__text');
  paragraph.textContent = message;

  listItem.append(img);
  listItem.append(paragraph);
  container.append(listItem);
};

const createComments = (comments, container, quantity) => {
  container.innerHTML = '';
  socialCommentShownCount.textContent = Math.min(comments.length, quantity);

  if (+socialCommentShownCount.textContent === comments.length) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
  }

  comments.slice(0, socialCommentShownCount.textContent)
    .forEach((comment) => createComment(comment, container));

  socialCommentCount.childNodes[3].textContent = numDecline(
    comments.length, ' комментария', ' комментариев', ' комментариев'
  );
};

export { createComments, NUMBER_TO_LOAD_COMMENTS };
