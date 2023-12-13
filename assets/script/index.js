'use strict';

import { print, onEvent, getElement, select, selectAll, sleep, randomNumber, filterArray, create } from './Utilities.js';

const mapClass = select('.map');
const locationButton = select('.location-button');

mapboxgl.accessToken = 'pk.eyJ1IjoibWF4MjI4IiwiYSI6ImNscTN4bGV3djAxNzIyaXVrOTl1cHVsMDcifQ.0qB6pxCGIinj_K9wTEzeWQ';
 let map = new mapboxgl.Map({
    container: mapClass,
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: [-74.5, 40], 
    zoom: 15
  });

function getLocaton(position) {
    let { latitude, longitude} = position.coords;
   
    map.setCenter([longitude, latitude]);

    const customMarker = document.createElement('div');
    customMarker.className = 'custom-marker';

    new mapboxgl.Marker(customMarker)
    .setLngLat([longitude, latitude])
    .addTo(map);
}
 
function errorHandler(error) {
    console.log(error.message);
}
 
const options = {
    enableHighAccuracy: true
};
 
onEvent('click', locationButton,  () => {
    if ('geolocation' in navigator) {
        const geo = navigator.geolocation;
        geo.getCurrentPosition(getLocaton, errorHandler, options)
    } else {
        console.log('Geolocation API is not supported in your browser')
    }
});