const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');
  thumbnail.dataset.id = photo.id;
  thumbnail.href = photo.url;
  image.src = photo.url;
  image.alt = photo.description;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  return thumbnail;
};

const renderThumbnails = (objects) => {
  objects.forEach((item) =>
    fragment.append(renderThumbnail(item)));
  container.append(fragment);
};

export { renderThumbnails };
