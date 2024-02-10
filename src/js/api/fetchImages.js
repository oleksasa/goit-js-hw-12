import axios from 'axios';
import { BASE_URL } from '../constants/base-url';

export const fetchImagesParams = {
  key: '42137546-386b5be41212ccd429cab5a80',
  image_type: 'photo',
  orientation: 'horizontal',
  safeSearch: true,
  per_page: 15,
  q: undefined,
  page: 1,
};

export async function fetchImages(q = 'flower', page = 20) {
  fetchImagesParams.q = q;
  fetchImagesParams.page = page;
  return axios.get(BASE_URL, { params: { ...fetchImagesParams, page, q } });
}
