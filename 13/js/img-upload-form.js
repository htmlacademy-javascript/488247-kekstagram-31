import { isEscapeKey } from './util.js';
import { onEffectChange } from './effects-slider.js';
import { error, isHashtagsValid } from './check-hashtag-validity.js';

const SCALE_STEP = 0.25;

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const smaller = imgUploadForm.querySelector('.scale__control--smaller');
const bigger = imgUploadForm.querySelector('.scale__control--bigger');
const img = imgUploadForm.querySelector('.img-upload__preview');
const scaleControl = imgUploadForm.querySelector('.scale__control--value');
const effectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectsList = imgUploadForm.querySelector('.effects__list');
const inputHashtag = imgUploadForm.querySelector('.text__hashtags');

let scale = 1;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(inputHashtag, isHashtagsValid, error, 2, false);

const onImgUploadClose = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  scale = 1;
  img.style.transform = `scale(${scale})`;
  effectLevel.classList.add('hidden');
  img.style.filter = 'none';
  imgUploadForm.reset();
  document.removeEventListener('keydown', onEscapeKeydown);
};

function onEscapeKeydown (evt) {
  if(isEscapeKey(evt)
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
  imgUploadCancel.addEventListener('click', onImgUploadClose);
  document.addEventListener('keydown', onEscapeKeydown);
};

const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    img.style.transform = `scale(${scale -= SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onBiggerClick = () => {
  if (scale < 1) {
    img.style.transform = `scale(${scale += SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onHashtagInput = () => {
  isHashtagsValid(inputHashtag.value);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    inputHashtag.value = inputHashtag.value.trim().replaceAll(/\s+/g, ' ');
    imgUploadForm.submit();
  }
};

uploadFile.addEventListener('change', onPhotoSelect);

smaller.addEventListener('click', onSmallerClick);

bigger.addEventListener('click', onBiggerClick);

effectsList.addEventListener('change', onEffectChange);

inputHashtag.addEventListener('input', onHashtagInput);

imgUploadForm.addEventListener('submit', onFormSubmit);
