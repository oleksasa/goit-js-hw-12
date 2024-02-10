import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const toastOptions = {
  titleColor: '#FFFFFF',
  messageColor: '#FFFFFF',
  messageSize: '16px',
  position: 'topRight',
  displayMode: 'replace',
  closeOnEscape: true,
  pauseOnHover: false,
  maxWidth: 432,
  messageSize: '16px',
  messageLineHeight: '24px',
};

export function toastError(message) {
  iziToast.show({
    message,
    backgroundColor: '#EF4040',
    progressBarColor: '#FFE0AC',
    icon: 'icon-close',
    ...toastOptions,
  });
}

export function toastSuccess(message) {
  iziToast.show({
    message,
    backgroundColor: '#59A10D',
    progressBarColor: '#B5EA7C',
    icon: 'icon-chek',
    ...toastOptions,
  });
}

export function toastWarning(message) {
  iziToast.show({
    message,
    backgroundColor: '#FFA500',
    progressBarColor: '#708090',
    icon: 'icon-warning',
    ...toastOptions,
  });
}
