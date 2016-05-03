'use strict';

let map;
function initMap() {
  var mapOptions = {
    zoom: 12,
    center: {lat: 42.3601, lng: -71.0589},
    styles: [{"featureType":"all","elementType":"all","stylers":[{"invert_lightness":true},{"saturation":10},{"lightness":30},{"gamma":0.5},{"hue":"#435158"}]}]

  };


  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
