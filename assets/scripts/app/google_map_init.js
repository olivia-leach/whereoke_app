'use strict';

let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.3601, lng: -71.0589},
    zoom: 12
  });
}
