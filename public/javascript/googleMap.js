// gives an array of all locations
async function getAllBins(url){
  const response = await fetch(url);
  var data = await response.json();
  return data;
}

//using fetch to make get request to get all bin data...
//use the data to create markers on the map
const data = getAllBins("http://localhost:4000/get");

var infowindow;

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.319, lng: 82.965 },
        zoom: 12.5,
        mapId: '4719b11c4529a336'
      });

    

    const iconBase =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    const icons = {
      fullbin: {
        icon: iconBase + "parking_lot_maps.png",
      },
      emptybin: {
        icon: iconBase + "library_maps.png",}
      }

    const features = [
        {
          position: new google.maps.LatLng(25.283165, 82.969402),
          type: "fullbin"
          
        }]
    getAllBins("http://localhost:4000/get").then((allBins) => {
      // console.log(allBins);
      for(var i = 0; i < 2000; i++){
        features.push({
          position: new google.maps.LatLng(Number(allBins[i].LNG), Number(allBins[i].LAT)),
          type: "fullbin",
          id: allBins[i]._id
        });
      };

      for (let i = 0; i < features.length; i++) {
        var marker = new google.maps.Marker({
          position: features[i].position,
          icon: icons[features[i].type].icon,
          map: map,
        });
        marker.addListener('click', ()=> {
          location.href = `http://localhost:4000/waste/${features[i].id}`;
        });
      }

        
        infowindow = new google.maps.InfoWindow();
    })
    



        
           
  function makeInfoWindowEvent(map, infowindow,contentString, marker) {
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      });
    }
    marker.addListener('click',makeInfoWindowEvent(map, infowindow,'<button id="fill"> Filled</button>'+'/n'+'<button id="empty"> Empty</button>', marker) )
}
          


function locate() {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        infowindow.setPosition(pos);
        infowindow.setContent("Pin");
        infowindow.open(map);
        map.setCenter(pos);
        


      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
};

new google.maps.Marker({
position: pos,
map: map,
});

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(
  browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation."
);
infoWindow.open(map);
}


// const qrScanner = new QrScanner(qrDiv, result => console.log('deoded stuff is', result));

function scan() {
  console.log('clikkker');
  import('./qr-scanner.min.js').then((res)=> {
    const map = document.getElementById('map');
    const qrDiv = document.createElement('video');
    qrDiv.id = 'qr-scanner';
    const container = document.getElementById('container');
    container.appendChild(qrDiv);
    if (map) {
      container.removeChild(map);
    }

    const QrScanner = res.default;
    QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';
    const qrScanner = new QrScanner(qrDiv, result => console.log('decoded qr code:', result), err => console.log(err));

    qrScanner.start(qrDiv);

  })
}




    


