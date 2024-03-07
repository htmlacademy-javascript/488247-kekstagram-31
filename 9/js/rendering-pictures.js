import { addPhoto, QUANTITY } from './data';
import { createObjectsArray } from './util';

const renderPictures = () => {
  const photos = createObjectsArray(addPhoto, QUANTITY);
  const pictures = document.querySelector('.pictures');
  const template = document.querySelector('#picture');

  for(const photo of photos) {
    const picture = template.content.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__img').alt = photo.description;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    pictures.append(picture);
  }
  return pictures;
};

export { renderPictures };
