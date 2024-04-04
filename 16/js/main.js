import { getData } from './api.js';
import { onSuccess, onError } from './request-result.js';
import './img-upload-form.js';
import './add-photo.js';

getData()
  .then((data) => {
    onSuccess(data);
  })
  .catch(() => {
    onError();
  });
