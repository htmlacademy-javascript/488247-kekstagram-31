import { photos } from './data.js';
import { isEscapeKey, numDecline } from './util.js';

const NUMBER_TO_LOAD_COMMENTS = 5;

const Avatar = {
  HEIGHT: 35,
  WIDTH: 35,
};

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentLoader = bigPicture.querySelector('.social__comments-loader.comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');

let numberShownComments;
let picture;

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

const onLoadComments = () => {
  createComments(
    picture.comments,
    socialComments,
    numberShownComments += NUMBER_TO_LOAD_COMMENTS
  );
};

const onBigPictureClose = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentLoader.removeEventListener('click', onLoadComments);
  document.removeEventListener('keydown', onEscapeKeydown);
};

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onBigPictureClose();
  }
}

bigPictureCancel.addEventListener('click', onBigPictureClose);

const onThumbnailClick = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    picture = photos[evt.target.closest('.picture').dataset.id];

    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = picture.url;
    bigPictureImg.alt = picture.description;
    socialCaption.textContent = picture.description;
    socialCommentTotalCount.textContent = picture.comments.length;
    likesCount.textContent = picture.likes;

    numberShownComments = NUMBER_TO_LOAD_COMMENTS;

    createComments(picture.comments, socialComments, numberShownComments);

    commentLoader.addEventListener('click', onLoadComments);

    document.addEventListener('keydown', onEscapeKeydown);
  }
};

pictures.addEventListener('click', onThumbnailClick);