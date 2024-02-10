import { GALLERY_LINK } from '../constants/classes';

export default function createGallery({
  largeImageURL,
  tags,
  webformatURL,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<a href="${largeImageURL}" class="${GALLERY_LINK}">
    <figure>
     <img src="${webformatURL}" alt="${tags}" class="gallery-image">
     <figcaption class="gallery__figcaption">
       <div class="image-item">Likes <span class="image-elem">${likes}</span></div>
       <div class="image-item">Views <span class="image-elem">${views}</span></div>
       <div class="image-item">Comments <span class="image-elem">${comments}</span></div>
       <div class="image-item">Downloads <span class="image-elem">${downloads}</span></div>
  </figcaption>
  </figure>
  </a>
  `;
}
