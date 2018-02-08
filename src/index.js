let bikeMarker;

function initMap() {
  let location = {lat: -10.0000000, lng: -76.0000000};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: location
  });

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
      position: {lat: myLatit, lng: myLongit},    
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: image
    });
    bikeMarker.addListener('click', toggleBounce);

    map.setZoom(17);
    map.setCenter({lat: myLatit, lng: myLongit });
  };

  let functionError = (error) => {
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