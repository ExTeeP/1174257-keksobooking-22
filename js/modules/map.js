import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet-sleep';
import { disabledForm } from './utils';
import { cartNoticeListFragment as dataNoticeListMarkup } from './notice-popup';
import { cartNoticeList as dataNoticeList } from './notice-popup';

const DEFAULT_CORDS = [35.68038, 139.76911];
const DEFAULT_ZOOM = 12;
const mapFilterForm = document.querySelector('.map__filters');
const noticeFormElement = document.querySelector('.ad-form');
const noticeAddress = noticeFormElement.querySelector('#address');

noticeAddress.readOnly = true;
noticeAddress.placeholder = 'Укажите место используя метку на карте';
noticeAddress.value = DEFAULT_CORDS.join(', ')

const map = L.map('map-canvas', {
  hoverToWake: false,
  sleepNote: true,
  wakeMessage: 'Кликните левой клавишей мышы что-бы активировать карту',
  sleepOpacity: 0.7,
  sleepNoteStyle: {
    'opacity': '1',
    'border': '2px solid red',
  },
})
  .on('load', function () {
    disabledForm(mapFilterForm, false);
    disabledForm(noticeFormElement, false);
  })
  .setView(DEFAULT_CORDS, DEFAULT_ZOOM);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const noticeIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const mainMarker = L.marker(DEFAULT_CORDS, {
  icon: mainIcon,
  draggable: true,
});

const noticeMarkers = L.markerClusterGroup();

const noticeMarker = function (latLng) {
  return L.marker(latLng, {
    icon: noticeIcon,
    draggable: false,
  });
};

mainMarker.addTo(map);

dataNoticeList.forEach((notice, i) => {
  const { x: lat } = notice.location;
  const { y: lng } = notice.location;

  noticeMarker([lat, lng])
    .bindPopup(dataNoticeListMarkup.childNodes[i],
      {
        keepInView: true,
      },
    )
    .addTo(noticeMarkers);
});

noticeMarkers.addTo(map)

mainMarker.on('moveend', function (evt) {
  const y = evt.target.getLatLng().lat.toFixed(5);
  const x = evt.target.getLatLng().lng.toFixed(5);
  noticeAddress.value = `${y}, ${x}`;
});
