import { getOffersList, NUMBER_OFFER } from './data';

const cartNoticeTemplate = document.querySelector('#card').content.querySelector('.popup');
const cartNoticeListFragment = document.createDocumentFragment();
const cartNoticeList = getOffersList(NUMBER_OFFER);

const getHouseType = function(type) {
  switch (type) {
    case 'bungalow':
      return 'Бунгало'
    case 'flat':
      return 'Квартира'
    case 'house':
      return 'Дом'
    case 'palace':
      return 'Дворец'
  }
};

const createFeatureElement = function(feature) {

  if (feature) {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(`popup__feature--${feature}`);

    return featureElement;
  }

  return '';
};

const createPhotoElement = function(photo) {

  if (photo) {
    const photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.width = '45';
    photoElement.height = '40';
    photoElement.src = photo;
    photoElement.alt = 'Фотография жилья';

    return photoElement;
  }

  return '';
};

const removeVoidElement = function(parent, element) {
  if (element.innerHTML === '') {
    parent.removeChild(element)
  }
};

cartNoticeList.forEach((notice) => {
  const noticeElement = cartNoticeTemplate.cloneNode(true);
  const featuresList = noticeElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  const photosList = noticeElement.querySelector('.popup__photos');
  photosList.innerHTML = '';

  noticeElement.querySelector('.popup__avatar').src = notice.author.avatar;
  noticeElement.querySelector('.popup__title').textContent = notice.offer.title;
  noticeElement.querySelector('.popup__text--price').textContent = notice.offer.price;
  noticeElement.querySelector('.popup__text--address').textContent = notice.offer.address;
  noticeElement.querySelector('.popup__description').textContent = notice.offer.description;
  noticeElement.querySelector('.popup__type').textContent = getHouseType(notice.offer.type);
  noticeElement.querySelector('.popup__text--time').textContent = `Заезд после ${notice.offer.checkin}, выезд до ${notice.offer.checkout}`;
  noticeElement.querySelector('.popup__text--capacity').textContent = `${notice.offer.rooms} комнаты для ${notice.offer.guests} гостей`;

  notice.offer.photos.forEach((url) => {
    photosList.appendChild(createPhotoElement(url))
  });

  notice.offer.features.forEach((feature) => {
    featuresList.appendChild(createFeatureElement(feature))
  });

  removeVoidElement(noticeElement, photosList);
  removeVoidElement(noticeElement, featuresList);

  cartNoticeListFragment.appendChild(noticeElement);
});

export {
  cartNoticeList,
  cartNoticeListFragment
}
