// gives an array of all locations
async function getAllBins(url){
  const response = await fetch(url);
  var data = await response.json();
  return data;
}

//using fetch to make get request to get all bin data...
//use the data to create markers on the map
var data;
if (localStorage.getItem('mapData') === null) {
  data = getAllBins("http://localhost:4000/get").then((allBins) => {
    localStorage.setItem('mapData', JSON.stringify(allBins));
    console.log('data addded to LS');
  })
} else {
  data = JSON.parse(localStorage.getItem('mapData'));
  console.log('data loaded from LS');
}


var infowindow;

function initMap(){
  console.log('init map ran');
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.319, lng: 82.965 },
        zoom: 12.5,
        mapId: '385158fa975984c4'
      });


    const features = [
        {
          position: new google.maps.LatLng(25.283165, 82.969402),
          type: "filled"
          
        }]

    for(var i = 0; i < 2000; i++){
      features.push({
        position: new google.maps.LatLng(Number(data[i].LNG), Number(data[i].LAT)),
        type: data[i].Status,
        id: data[i]._id
      });
    };

    for (let i = 0; i < features.length; i++) {
      if (features[i].type === 'empty') {
        var marker = new google.maps.Marker({
          position: features[i].position,
          icon: "../images/empty.png",
          map: map,
        });
      } else {
        var marker = new google.maps.Marker({
          position: features[i].position,
          icon: "../images/filled.png",
          map: map,
        });
      }
      
      marker.addListener('click', ()=> {
        location.href = `http://localhost:4000/waste/${features[i].id}`;
      });
    }

    setTimeout(()=> {
      data = getAllBins("http://localhost:4000/get").then((allBins) => {
        localStorage.setItem('mapData', JSON.stringify(allBins));
        console.log('data updated to LS');
        // initMap();
        
      })
    }, 5000);

        
    infowindow = new google.maps.InfoWindow();
    
           
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




    


