import { photos } from './data.js';
import { isEscapeKey, isEnterKey } from './util.js';

const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');

const createComments = (comments, container) => {
  container.innerHTML = '';

  comments.forEach((comment) => {
    const listItem = document.createElement('li');
    listItem.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const paragraph = document.createElement('p');
    paragraph.classList.add('social__text');
    paragraph.textContent = comment.message;

    listItem.append(img);
    listItem.append(paragraph);
    container.append(listItem);
  });
};

const onBigPictureClose = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  deleteHandlers();
};

const onEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onBigPictureClose();
  }
};

function deleteHandlers() {
  bigPictureCancel.removeEventListener('click', onBigPictureClose);
  document.removeEventListener('keydown', onEscapeKeydown);
}

const onBigPictureOpen = (evt) => {
  if (evt.target.matches('.picture__img') || evt.target.matches('.picture')) {
    evt.preventDefault();

    const picture = evt.target.matches('.picture__img')
      ? photos[evt.target.parentNode.dataset.id]
      : photos[evt.target.dataset.id];

    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    socialCommentCount.classList.add('hidden');
    commentLoader.classList.add('hidden');
    bigPictureImg.src = picture.url;
    bigPictureImg.alt = picture.description;
    socialCaption.textContent = picture.description;
    socialCommentTotalCount.textContent = picture.comments.length;
    likesCount.textContent = picture.likes;

    createComments(picture.comments, socialComments);

    bigPictureCancel.addEventListener('click', onBigPictureClose);

    document.addEventListener('keydown', onEscapeKeydown);
  }
};

const onEnterKeydown = (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    onBigPictureOpen(evt);
  }
};

pictures.addEventListener('keydown', onEnterKeydown);

pictures.addEventListener('click', onBigPictureOpen);
