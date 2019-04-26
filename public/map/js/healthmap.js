// Simple JS for manipulating the maps page
var map;
function initMap() {
    console.log("Jello Man")
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.743991, lng: -74.032363},
        zoom: 12
    });
    var marker = new google.maps.Marker({position: {lat: 40.743991, lng: -74.032363}, map: map});
}
