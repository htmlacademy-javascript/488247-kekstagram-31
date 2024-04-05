const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

const uploadFile = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const effectList = document.querySelector('.effects__list');
const smallImages = effectList.querySelectorAll('.effects__preview');

const onUploadImageChange = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const objectURL = URL.createObjectURL(file);
    preview.src = objectURL;

    smallImages.forEach((evt) => {
      evt.style.backgroundImage = `url(${objectURL})`;
    });

    preview.addEventListener('load', () => {
      URL.revokeObjectURL(objectURL);
    });
  }
};

uploadFile.addEventListener('change', onUploadImageChange);
