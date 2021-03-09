import { APARTMENTS } from './data';
import { disabledForm } from './utils';

const noticeFormElement = document.querySelector('.ad-form');
const typeElement = noticeFormElement.querySelector('#type');
const priceElement = noticeFormElement.querySelector('#price');
const timeInElement = noticeFormElement.querySelector('#timein');
const timeOutElement = noticeFormElement.querySelector('#timeout');

const onApartmentTypeChange = function (evt) {
  const targetValue = evt.target.value;

  for (let i = 0; i < APARTMENTS.length; i++) {
    const apartment = APARTMENTS[i];

    if (targetValue === apartment.type) {
      priceElement.placeholder = apartment.price;
      priceElement.min = apartment.price;
    }
  }
};

const onTimeElementChange = function (evt) {
  const target = evt.target;
  const value = target.value;

  if (target === timeInElement) {
    timeOutElement.value = value;
  } else {
    timeInElement.value = value;
  }
};

typeElement.addEventListener('change', onApartmentTypeChange);

timeInElement.addEventListener('change', onTimeElementChange);
timeOutElement.addEventListener('change', onTimeElementChange);

disabledForm(noticeFormElement, true);
