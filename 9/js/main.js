import { addPhoto, QUANTITY } from './data.js';
import { createObjectsArray } from './util.js';
import { renderPictures } from './rendering-pictures.js';

const photos = createObjectsArray(addPhoto, QUANTITY);
renderPictures(photos);
