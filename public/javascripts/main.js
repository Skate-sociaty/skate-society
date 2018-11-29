const {parks} = window;
function startMap() {
  const centerMadrid = {
    lat: 40.416947,
    lng: -3.703523
  };
  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 11,
      center: centerMadrid
    }

  );
  function addMarker(lat, lng, title) {
      new google.maps.Marker({
        position: {
          lat,
          lng
        },
        map,
        title
      })
    }
  let marker;
  parks.forEach(({position:{lat, lng} = {lat:undefined, lng:undefined}, title="Park"}) => {
    if(lat && lng){
      addMarker(lat, lng, title)}
  });
  google.maps.event.addListener(map, "click", function (e) {
    const location = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    console.log(location);

    document.querySelector('input[name=lat]').value = location.lat;
    document.querySelector('input[name=lng]').value = location.lng;

    // if (marker) { marker.setMap(null) }
    // marker = addMarker('Skatepark Position', location, map);

    document.querySelector('.locationStatus').innerHTML = "Ready";
  })
  console.log(map)
}
startMap();

// }
// addMarker();



