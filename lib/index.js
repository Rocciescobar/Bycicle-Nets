'use strict';

var bikeMarker = void 0;

function initMap() {
  var location = { lat: -10.0000000, lng: -76.0000000 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: location
  });

  // Añade marcador
  var myMarker = new google.maps.Marker({
    position: location,
    map: map
  });

  // Obtener ubicación actual de usuario
  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(functionSuccess, functionError);
    }
  };
  document.getElementById('findMe').addEventListener('click', search);

  var myLatit = void 0,
      myLongit = void 0;
  var functionSuccess = function functionSuccess(position) {
    myLatit = position.coords.latitude;
    myLongit = position.coords.longitude;

    // Añade marcador de bicicleta
    var image = 'assets/images/bike.png';
    bikeMarker = new google.maps.Marker({
      position: { lat: myLatit, lng: myLongit },
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: image
    });
    bikeMarker.addListener('click', toggleBounce);

    map.setZoom(17);
    map.setCenter({ lat: myLatit, lng: myLongit });
  };

  var functionError = function functionError(error) {
    alert('Tenemos un problema con encontrar tu ubicación');
  };
};

// Animación del marcador
function toggleBounce() {
  if (bikeMarker.getAnimation() !== null) {
    bikeMarker.setAnimation(null);
  } else {
    bikeMarker.setAnimation(google.maps.Animation.BOUNCE);
  }
};