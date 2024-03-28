import { getData } from './api.js';
import { renderThumbnails } from './render-thumbnails.js';
import './open-big-picture.js';
import { onFormSubmit, onImgUploadClose } from './img-upload-form.js';

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');

getData()
  .then((photos) => {
    renderThumbnails(photos);
  }).catch(() => {
    document.body.append(dataError);
    setTimeout(() => document.body.removeChild(dataError), 5000);
  });

onFormSubmit(onImgUploadClose);
