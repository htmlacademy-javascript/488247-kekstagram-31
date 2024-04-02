import { getData } from './api.js';
import { renderThumbnails } from './render-thumbnails.js';
import './open-big-picture.js';
import { changeFilter } from './img-filters.js';
import { onFormSubmit, onImgUploadClose } from './img-upload-form.js';
import './add-photo.js';

const SHOW_MESSAGE_TIME = 5000;

let photos = [];

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const imgFilters = document.querySelector('.img-filters');

const onSuccess = (data) => {
  photos = [...data];
  renderThumbnails(photos);
  imgFilters.classList.remove('img-filters--inactive');
};

const onError = () => {
  imgFilters.classList.add('img-filters--inactive');
  document.body.append(dataError);
  setTimeout(() => dataError.remove(), SHOW_MESSAGE_TIME);
};

getData()
  .then((data) => {
    onSuccess(data);
    changeFilter(photos);
  })
  .catch(() => {
    onError();
  });

onFormSubmit(onImgUploadClose);
