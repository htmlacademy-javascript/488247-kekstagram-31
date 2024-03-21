import { photos } from './data.js';
import { createComments, NUMBER_TO_LOAD_COMMENTS } from './create-comments.js';
import { isEscapeKey } from './util.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const commentLoader = bigPicture.querySelector('.comments-loader');

let picture;
let numberShownComments;

const onCommentsLoad = () => {
  createComments(
    picture.comments,
    socialComments,
    numberShownComments += NUMBER_TO_LOAD_COMMENTS
  );
};

const onBigPictureClose = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentLoader.removeEventListener('click', onCommentsLoad);
  document.removeEventListener('keydown', onEscapeKeydown);
};

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onBigPictureClose();
  }
}

const onThumbnailClick = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    picture = photos[evt.target.closest('.picture').dataset.id];

    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = picture.url;
    bigPictureImg.alt = picture.description;
    socialCaption.textContent = picture.description;
    commentsTotalCount.textContent = picture.comments.length;
    likesCount.textContent = picture.likes;

    numberShownComments = NUMBER_TO_LOAD_COMMENTS;

    createComments(picture.comments, socialComments, numberShownComments);

    commentLoader.addEventListener('click', onCommentsLoad);

    document.addEventListener('keydown', onEscapeKeydown);
  }
};

bigPictureCancel.addEventListener('click', onBigPictureClose);

pictures.addEventListener('click', onThumbnailClick);
