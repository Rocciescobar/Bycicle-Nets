
let bikeMarker;

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  let location = {lat: -10.0000000,
    lng: -76.0000000};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: location
  });

  directionsDisplay.setMap(map);
  // Añade marcador
  let myMarker = new google.maps.Marker({
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

  let myLatit, myLongit;
  let functionSuccess = (position) => {
    myLatit = position.coords.latitude;
    myLongit = position.coords.longitude;

    // Añade marcador de bicicleta
    let image = 'assets/images/bike.png';
    bikeMarker = new google.maps.Marker({
      position: {lat: myLatit,
        lng: myLongit},    
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: image
    });
    bikeMarker.addListener('click', toggleBounce);

    map.setZoom(17);
    map.setCenter({lat: myLatit,
      lng: myLongit });
  };
  let functionError = (error) => {
    alert('Tenemos un problema con encontrar tu ubicación');
  };

  // autocompletado:
  let startPoint = document.getElementById('start-point');
  let finalPoint = document.getElementById('final-point');
  new google.maps.places.Autocomplete(startPoint);
  new google.maps.places.Autocomplete(finalPoint);

  // obtener ruta:
  let getRoute = (event) => {
    event.preventDefault();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('route').addEventListener('click', getRoute);
}

let calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
  directionsService.route({
    origin: document.getElementById('start-point').value,
    destination: document.getElementById('final-point').value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Estamos teniendo inconvenientes para encontrar su ubicación');
    }
    document.querySelector('.description-js').innerHTML = 'Punto de origen :' + document.getElementById('start-point').value + '<br>' + 'Punto de llegada :' + document.getElementById('final-point').value ;
    document.getElementById('start-point').value = '';
    document.getElementById('final-point').value = '';
  });
};

// Animación del marcador
function toggleBounce() {
  if (bikeMarker.getAnimation() !== null) {
    bikeMarker.setAnimation(null);
  } else {
    bikeMarker.setAnimation(google.maps.Animation.BOUNCE);
  }
};


