const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');
  const { id, url, description, likes, comments } = photo;

  thumbnail.dataset.id = id;
  thumbnail.href = url;
  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (objects) => {
  objects.forEach((item) =>
    fragment.append(renderThumbnail(item)));
  container.append(fragment);
};

export { renderThumbnails };
