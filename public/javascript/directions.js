var checkboxes = document.getElementsByClassName("checkbox");
const container = document.getElementById("container");
const topContainer = document.getElementById("top-container");
const bottomContainer = document.getElementById("bottom-container");
var map = document.getElementById('map');
const navigate = document.getElementById("navigate");
const hidden = document.getElementById("hidden");

var s="?";
var cnt=1;
navigate.addEventListener('click', function() {
    var values = [];
    for (i=0; i < checkboxes.length;  i++) {
        if (checkboxes[i].checked) {
            values.push(checkboxes[i].value);
            s+= "id" + String(cnt) + "=" + checkboxes[i].value + "&";
            cnt++;
        }
    };
    s = s.slice(0, -1);
    topContainer.remove();
    map.style.display = "block";
    bottomContainer.style.height = "40%";
    
    // code to initiate map...
    topContainer.remove();
    map.style.display = "block";
    // bottomContainer.style.height = "30%";
    
    function initMap(coordinatesArray){
        console.log("initmap function...");
        if (coordinatesArray.length < 2) {
            bottomContainer.innerHTML += "You have chosen less than 2 places to visit. Please make a selection worth more than two places!!!";
            // setTimeout(()=> { location.reload() } ,3000)
        } else {
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();
            const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 6,
            center: { lat: 25.2917, lng: 83.00617 },
            });
            directionsRenderer.setMap(map);
            directionsRenderer.setPanel(document.getElementById("directionsPanel"));
            calculateAndDisplayRoute(directionsService, directionsRenderer, coordinatesArray);
        }
    };


    function calculateAndDisplayRoute(directionsService, directionsRenderer, coordinatesArray) {
        console.log("calculateAndDisplayRoute is running");
        console.log(coordinatesArray);
        const start = coordinatesArray[0]
        const final = coordinatesArray[coordinatesArray.length - 1]
        if (coordinatesArray.length === 2) {
            directionsService.route(
                {
                    origin: start,
                    destination: final,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                    console.log(status);
                    console.log(response);
                if (status === "OK" && response) {
                    directionsRenderer.setDirections(response);
                    const route = response.routes[0];
                    // const summaryPanel = document.getElementById("directions-panel");
                    // summaryPanel.innerHTML = "";
        
                    
                } else {
                    window.alert("Directions request failed due to " + status);
                }
                }
        );
        } else {
            const checkboxArray = coordinatesArray;
            const waypts = [];
            for (let i = 1; i < checkboxArray.length - 1; i++) {
                waypts.push({
                    location: checkboxArray[i],
                    stopover: true,
                });
            }
            directionsService.route(
                {
                    origin: start,
                    destination: final,
                    waypoints: waypts,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                    console.log(status);
                    console.log(response);
                if (status === "OK" && response) {
                    directionsRenderer.setDirections(response);
                    const route = response.routes[0];
                    // const summaryPanel = document.getElementById("directions-panel");
                    // summaryPanel.innerHTML = "";
        
                    
                } else {
                    window.alert("Directions request failed due to " + status);
                }
                }
        );   
        }
    };
    
    async function getCoordinates(url) {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    };
    const pathname = location.pathname.split('/');
    var url = window.location.origin + "/get/coordinates/" + pathname[pathname.length-1] + s ;
    const coordinatesArray = getCoordinates(url);
    coordinatesArray.then((data)=> {
        // initMap([{lat: 25.29896, lng: 83.0073}, {lat: 25.31072, lng: 83.01398}]);
        initMap(data);
    });
});