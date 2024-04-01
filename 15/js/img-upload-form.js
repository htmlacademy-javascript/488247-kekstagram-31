import { isEscapeKey } from './util.js';
import { onEffectChange } from './effects-slider.js';
import { isFormValid, pristine } from './check-validity.js';
import { sendData } from './api.js';
import { showModal } from './show-modal.js';

const SCALE_STEP = 0.25;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};

const errorPopup = document.querySelector('#error').content.querySelector('.error');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const smaller = imgUploadForm.querySelector('.scale__control--smaller');
const bigger = imgUploadForm.querySelector('.scale__control--bigger');
const img = imgUploadForm.querySelector('.img-upload__preview img');
const scaleControl = imgUploadForm.querySelector('.scale__control--value');
const effectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectsList = imgUploadForm.querySelector('.effects__list');
const inputHashtags = imgUploadForm.querySelector('.text__hashtags');
const inputDescription = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

let scale = 1;

const onImgUploadClose = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  scale = 1;
  img.style.transform = `scale(${scale})`;
  effectLevel.classList.add('hidden');
  img.style.filter = 'none';
  submitButton.disabled = false;
  imgUploadForm.reset();
  document.removeEventListener('keydown', onEscapeKeydown);
};

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    onImgUploadClose();
  }
}

const onPhotoSelect = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEscapeKeydown);
};

const changeZoom = (factor = 1) => {
  if (scale < 1 && factor > 0 || scale > SCALE_STEP && factor < 0) {
    scale += SCALE_STEP * factor;
    img.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onSmallerClick = () => {
  changeZoom(-1);
};

const onBiggerClick = () => {
  changeZoom();
};

const onHashtagInput = () => {
  submitButton.disabled = !isFormValid(inputHashtags.value);
};

const onCommentInput = () => {
  submitButton.disabled = !isFormValid(inputHashtags.value);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      inputHashtags.value = inputHashtags.value.trim().replaceAll(/\s+/g, ' ');
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(onSuccess)
        .then(unblockSubmitButton)
        .then(() => {
          if (submitButton.textContent === SubmitButtonText.IDLE) {
            showModal(successPopup, 'success');
          }
        })
        .catch(() => showModal(errorPopup, 'error'));
    }
  });
};

uploadFile.addEventListener('change', onPhotoSelect);

imgUploadCancel.addEventListener('click', onImgUploadClose);

smaller.addEventListener('click', onSmallerClick);

bigger.addEventListener('click', onBiggerClick);

effectsList.addEventListener('change', onEffectChange);

inputHashtags.addEventListener('input', onHashtagInput);

inputDescription.addEventListener('input', onCommentInput);

export { onFormSubmit, onImgUploadClose };
