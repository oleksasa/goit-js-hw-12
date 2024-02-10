import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImagesParams } from './js/api/fetchImages';

import { toastError, toastSuccess, toastWarning } from './js/components/toast';

import createGallery from './js/components/gallery';

import selector from './js/components/selector';

import { fetchImages } from './js/api/fetchImages';

import { GALLERY_LINK } from './js/constants/classes';

let total;
let endOfPageElement;

const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0,
});

selector.searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  fetchImagesParams.q = event.target.elements.query.value;

  if (fetchImagesParams.q === '') {
    return;
  }

  selector.galleryContainer.innerHTML = '';
  selector.loaderContainer.style.display = 'block';

  try {
    fetchImagesParams.page = 1;
    const {
      data: { hits, totalHits },
    } = await fetchImages(fetchImagesParams.q, fetchImagesParams.page);

    if (Array.isArray(hits) && hits.length > 0) {
      const galleryHTML = hits.map(createGallery).join('');
      selector.galleryContainer.innerHTML += galleryHTML;

      const lightbox = new SimpleLightbox(`.${GALLERY_LINK}`);

      lightbox.refresh();

      endOfPageElement =
        selector.galleryContainer.children[
          selector.galleryContainer.children.length - 1
        ];

      observer.observe(endOfPageElement);

      total = totalHits;

      toastSuccess(`Was found: ${totalHits} images`);
    } else {
      toastError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
  } catch (error) {
    toastError(`Error fetching images: ${error}`);
  } finally {
    selector.searchForm.reset();
    selector.loaderContainer.style.display = 'none';
  }
});

async function handleIntersection(entries) {
  const entry = entries[0];
  if (Math.ceil(total / fetchImagesParams.per_page) <= fetchImagesParams.page) {
    return toastWarning(
      "We're sorry, but you've reached the end of search results."
    );
  }

  if (entry.isIntersecting) {
    selector.loaderScrollContainer.style.display = 'block';

    fetchImagesParams.page++;

    try {
      const {
        data: { hits },
      } = await fetchImages(fetchImagesParams.q, fetchImagesParams.page);

      if (Array.isArray(hits) && hits.length > 0) {
        const galleryHTML = hits.map(createGallery).join('');
        selector.galleryContainer.innerHTML += galleryHTML;

        const lightbox = new SimpleLightbox(`.${GALLERY_LINK}`);

        lightbox.refresh();

        endOfPageElement =
          selector.galleryContainer.children[
            selector.galleryContainer.children.length - 1
          ];

        observer.observe(endOfPageElement);
      }
    } catch (error) {
      toastError(`Error loading images: ${error.message}`);
    } finally {
      selector.loaderScrollContainer.style.display = 'none';
    }
  }
}
