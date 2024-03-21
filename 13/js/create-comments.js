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

const createComments = (comments, container, quantity) => {
  container.innerHTML = '';
  socialCommentShownCount.textContent = Math.min(comments.length, quantity);

  if (comments.length > NUMBER_TO_LOAD_COMMENTS) {
    commentLoader.classList.remove('hidden');
  }

  if (+socialCommentShownCount.textContent === comments.length) {
    commentLoader.classList.add('hidden');
  }

  for (let i = 0; i < socialCommentShownCount.textContent; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comments[i].avatar;
    img.alt = comments[i].name;
    img.height = Avatar.HEIGHT;
    img.width = Avatar.WIDTH;

    const paragraph = document.createElement('p');
    paragraph.classList.add('social__text');
    paragraph.textContent = comments[i].message;

    listItem.append(img);
    listItem.append(paragraph);
    container.append(listItem);
  }

  socialCommentCount.childNodes[3].textContent = numDecline(
    comments.length, ' комментария', ' комментариев', ' комментариев'
  );
};

export { createComments, NUMBER_TO_LOAD_COMMENTS };
