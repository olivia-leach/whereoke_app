'use strict';

const app = require('../app-data.js');

let map;
let geocoder;
// let addresses =["Somerville, MA", "Cambridge, MA"];

const mapGeocoder = function() {
  let bars = app.barsByDay;
  // console.log(bars);
  app.addresses = [];
  let names = [];
  let cityStates = [];
  for (let i = 0; i < bars.length; i++) {
    app.addresses.push(bars[i].address + ', ' + bars[i].city + ', ' + bars[i].state);
    names.push(bars[i].name);
    cityStates.push(bars[i].city + ', ' + bars[i].state);
  }

  console.log(app.addresses);
  let infowindow = new google.maps.InfoWindow();

  geocoder = new google.maps.Geocoder();
  let latlng = new google.maps.LatLng(42.3601, -71.0589);
  // let alllatlng = [];
  let myOptions = {
    zoom: 12,
    center: latlng,
    styles: [{"featureType":"all","elementType":"all","stylers":[{"invert_lightness":true},{"saturation":10},{"lightness":30},{"gamma":0.5},{"hue":"#435158"}]}],
    mapTypeControl: false
  };
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  if (geocoder) {
    for (let i = 0; i < app.addresses.length; i++) {
    geocoder.geocode( { 'address': app.addresses[i]}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (status !== google.maps.GeocoderStatus.ZERO_RESULTS) {
        // map.setCenter(results[0].geometry.location);
        // alllatlng.push(results[0].geometry.location);

          let marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title:app.addresses[i]
          });
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.close();
              infowindow.setContent('<b>'+names[i]+'</b><br>'+cityStates[i]);
              infowindow.open(map,marker);
          });

        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}
// var latlngbounds = new GLatLngBounds( );
// let latlngbounds = new google.maps.LatLngBounds();
// for (let i = 0; i < alllatlng.length; i++) {
//   latlngbounds.extent(alllatlng[i]);
// }
// map.setCenter( latlngbounds.getCenter( ), map.getBoundsZoomLevel( latlngbounds ) );
// map.setCenter(latlngbounds.getCenter());
// map.zoom(latlngbounds);
// map.fitBounds(latlngbounds);
// map.fitBounds(results[0].geometry.viewport);
};

module.exports = {
  mapGeocoder
};
