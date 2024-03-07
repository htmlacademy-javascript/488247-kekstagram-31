const pictures = document.querySelector('.pictures');
const picturesList = document.createDocumentFragment();

const renderPicture = (photo) => {
  const template = document.querySelector('#picture').content;
  const picture = template.cloneNode(true);
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__img').alt = photo.description;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  return picture;
};

const renderPictures = (objects) => {
  objects.forEach((item) =>
    picturesList.append(renderPicture(item)));
  pictures.append(picturesList);
};

export { renderPictures };
