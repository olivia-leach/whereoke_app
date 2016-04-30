'use strict';

const app = require('../app-data.js');

let map;
let geocoder;
// let addresses =["Somerville, MA", "Cambridge, MA"];

const mapGeocoder = function() {
  let bars = app.barsByDay;
  // console.log(bars);
  let addresses = [];
  let names = [];
  let cityStates = [];
  for (let i = 0; i < bars.length; i++) {
    addresses.push(bars[i].address + ', ' + bars[i].city + ', ' + bars[i].state);
    names.push(bars[i].name);
    cityStates.push(bars[i].city + ', ' + bars[i].state);
  }

  console.log(addresses);

  geocoder = new google.maps.Geocoder();
  let latlng = new google.maps.LatLng(42.3601, -71.0589);
  let myOptions = {
    zoom: 12,
    center: latlng,
  mapTypeControl: true,
  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
  navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  if (geocoder) {
    for (let i = 0; i < addresses.length; i++) {
    geocoder.geocode( { 'address': addresses[i]}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
        map.setCenter(results[0].geometry.location);

          let infowindow = new google.maps.InfoWindow(
              { content: '<b>'+names[i]+'</b><br>'+cityStates[i],
                size: new google.maps.Size(150,50)
              });

          let marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title:addresses[i]
          });
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
          });

        } else {
          alert("No results found");
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}
};

module.exports = {
  mapGeocoder
};
