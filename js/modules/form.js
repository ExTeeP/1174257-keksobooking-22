import { APARTMENTS, NUMBER_GUESTS, MAX_PRICE_VALUE } from './data';
import {
  disabledForm,
  removeChilds,
  renderElement,
  declOfNum
} from './utils';

const MIN_LENGTH_TITLE = 20;
const MAX_LENGTH_TITLE = 100;
const ANY_LETTER = /[^\d]/g;

const noticeFormElement = document.querySelector('.ad-form');
const noticeTitleInput = noticeFormElement.querySelector('#title');
const noticePriceInput = noticeFormElement.querySelector('#price');
const noticeTypeElement = noticeFormElement.querySelector('#type');
const noticeTimeInElement = noticeFormElement.querySelector('#timein');
const noticeTimeOutElement = noticeFormElement.querySelector('#timeout');
const roomNumberElement = noticeFormElement.querySelector('#room_number');
const guestNumberElement = noticeFormElement.querySelector('#capacity');

const setCustomBorder = (evt) => {
  evt.target.style.outline = '#db0303';
  evt.target.style.boxShadow = '0 0 10px 1px #db0303';
}

const removeCustomBorder = (evt) => {
  evt.target.style.outline = 'initial';
  evt.target.style.boxShadow = 'none';
}

const onTimeElementChange = function (evt) {
  const target = evt.target;
  const value = target.value;

  if (target === noticeTimeInElement) {
    noticeTimeOutElement.value = value;
  } else {
    noticeTimeInElement.value = value;
  }
};

const onNoticeTitleInput = (evt) => {
  const target = evt.target;
  const length = target.value.length;

  if ((length < MIN_LENGTH_TITLE && length != 0) || target.validity.tooShort) {
    setCustomBorder(evt);
    target.setCustomValidity('Слишком коротко');
  } else if (length > MAX_LENGTH_TITLE || target.validity.tooLong) {
    setCustomBorder(evt);
    target.setCustomValidity('Слишком длинно')
  } else if (length === 0 || target.validity.valueMissing) {
    setCustomBorder(evt);
    target.setCustomValidity('Обязательное поле');
  } else {
    removeCustomBorder(evt);
    target.setCustomValidity('');
  }

  target.reportValidity();
};

const onApartmentTypeChange = function (evt) {
  const target = evt.target;
  const value = target.value;

  for (let apartment of APARTMENTS) {

    if (value === apartment.type) {
      noticePriceInput.placeholder = apartment.price;
      noticePriceInput.min = apartment.price;
      noticePriceInput.value = noticePriceInput.min;
    }
  }
};

const onNoticePriceHandler = (evt) => {
  const target = evt.target;
  const valueInt = Number(target.value);
  const minValue = Number(target.min);

  if (target.value === '' || target.value.match(ANY_LETTER)) {
    target.value = '';

    setCustomBorder(evt);
    target.setCustomValidity(`Введите сумму, минимальная сумма ${target.min}`);
  } else if (valueInt < minValue) {
    setCustomBorder(evt);
    target.setCustomValidity(`Минимальная сумма ${target.min}`)
  } else if (valueInt > MAX_PRICE_VALUE && valueInt !== MAX_PRICE_VALUE) {
    target.value = String(MAX_PRICE_VALUE);

    setCustomBorder(evt);
    target.setCustomValidity(`Сумма не может превышать ${MAX_PRICE_VALUE}`)
  } else {
    removeCustomBorder(evt);
    target.setCustomValidity('');
  }

  target.reportValidity();
};

const guestOptionTemplate = (value, maxValue, cb) => {
  const titles = ['гостя', 'гостей', 'гостей'];
  const isMaxValue = value == maxValue ? 'selected=""' : '';
  const notForGuests = '100';

  if (value === notForGuests) {
    return (`<option value="0" selected="" >не для ${titles[2]}</option>`);
  } else {
    return (`<option value="${value}" ${isMaxValue} >для ${value} ${cb(value, titles)}</option>`);
  }
};

const renderGuestNumber = (count, guests) => {
  removeChilds(guestNumberElement);

  if (count === guests[0]) {
    renderElement(guestNumberElement, guestOptionTemplate(guests[0], 1));
  } else {
    for (let i = 1; i <= count; i++) {
      const value = guests[i];
      renderElement(guestNumberElement, guestOptionTemplate(value, count, declOfNum));
    }
  }
};

const onRoomNumberChange = function (evt) {
  renderGuestNumber(evt.target.value, NUMBER_GUESTS)
};

noticeTitleInput.addEventListener('input', onNoticeTitleInput);

noticeTypeElement.addEventListener('change', onApartmentTypeChange);

noticePriceInput.addEventListener('input', onNoticePriceHandler);
noticePriceInput.addEventListener('blur', onNoticePriceHandler);

noticeTimeInElement.addEventListener('change', onTimeElementChange);
noticeTimeOutElement.addEventListener('change', onTimeElementChange);

roomNumberElement.addEventListener('change', onRoomNumberChange)

disabledForm(noticeFormElement, true);
