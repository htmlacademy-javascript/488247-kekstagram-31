import { isEscapeKey } from './util.js';

const imgUpload = document.querySelector('.img-upload');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const uploadFile = imgUpload.querySelector('#upload-file');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
const inputHashtag = imgUpload.querySelector('.text__hashtags');
const imgDescription = imgUpload.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


const isHashtagsValid = (hashTags) => hashTags.match(/^(#[а-яё\w\d]{1,19}\s*){0,5}$/i);

const isHashtagsUnique = (hashTags) => {
  const hashTagsArray = hashTags.trim().toLowerCase().split(' ');

  for (let i = 0; i < hashTagsArray.length - 1; i++) {
    if (hashTagsArray.slice(i + 1).includes(hashTagsArray[i])) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(inputHashtag,
  isHashtagsValid,
  'хештеги должны начинаться с символа \'#\', содержать буквы и цифры, быть не длинее 20 символов и их не должно быть больше пяти',
  2,
  false);

pristine.addValidator(inputHashtag,
  isHashtagsUnique,
  'хештеги не должны повторяться',
  2,
  false);

const onImgUploadClose = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  imgUploadForm.reset();
  document.removeEventListener('keydown', onEscapeKeydown);
};

function onEscapeKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onImgUploadClose();
  }
}

const onSelectPhoto = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', onImgUploadClose);
  document.addEventListener('keydown', onEscapeKeydown);
};

inputHashtag.addEventListener('keydown', (evt) => evt.stopPropagation());

imgDescription.addEventListener('keydown', (evt) => evt.stopPropagation());

const onSubmitForm = (evt) => {
  evt.preventDefault();

  pristine.validate();
};

uploadFile.addEventListener('change', onSelectPhoto);

imgUploadForm.addEventListener('submit', onSubmitForm);
