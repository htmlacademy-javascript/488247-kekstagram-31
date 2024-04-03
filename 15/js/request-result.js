import { renderThumbnails } from './render-thumbnails.js';
import { changeFilter } from './img-filters.js';
import { openBigPicture } from './open-big-picture.js';

const SHOW_MESSAGE_TIME = 5000;

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const imgFilters = document.querySelector('.img-filters');

let photos = [];

const onSuccess = (data) => {
  imgFilters.classList.remove('img-filters--inactive');
  photos = [...data];
  renderThumbnails(photos);
  changeFilter(photos);
  openBigPicture(photos);
};

const onError = () => {
  imgFilters.classList.add('img-filters--inactive');
  document.body.append(dataError);
  setTimeout(() => dataError.remove(), SHOW_MESSAGE_TIME);
};

export { onSuccess, onError };
