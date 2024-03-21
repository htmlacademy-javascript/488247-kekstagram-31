import { isEscapeKey, numDecline } from './util.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

const imgUpload = document.querySelector('.img-upload');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const uploadFile = imgUpload.querySelector('#upload-file');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
const inputHashtag = imgUpload.querySelector('.text__hashtags');

let errorMessage = '';

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const error = () => errorMessage;

const isHashtagsValid = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решётки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хештега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} ${numDecline(
        MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов'
      )}`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(inputHashtag, isHashtagsValid, error, 2, false);

const onImgUploadClose = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
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

const onHashtagInput = () => {
  isHashtagsValid(inputHashtag.value);
};

const onSelectPhoto = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', onImgUploadClose);
  document.addEventListener('keydown', onEscapeKeydown);
};

const onSubmitForm = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    inputHashtag.value = inputHashtag.value.trim().replaceAll(/\s+/g, ' ');
    imgUploadForm.submit();
  }
};

inputHashtag.addEventListener('input', onHashtagInput);

uploadFile.addEventListener('change', onSelectPhoto);

imgUploadForm.addEventListener('submit', onSubmitForm);
