// JS and JQuery to manipulate google maps API
// Creates a variable for our map object
var map;
// Function to initialize the google maps
async function initMap() {
    console.log("Jello Man")
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.743991, lng: -74.032363},
        zoom: 12
    });
}


// Function to add map marker to map
function addMarker(coords, name){
    var marker = new google.maps.Marker({
        position: coords,
        title: name,
        animation: google.maps.Animation.DROP,
        map: map
    });


    function toggleBounce(){
        if(marker.getAnimation() !== null){
            marker.setAnimation(null)
        }
        else {
            marker.setAnimation(google.maps.Animation.BOUNCE)
        }
    }


    marker.addListener('click', toggleBounce)

    
}


(async function($){
    // var locObj = JSON.parse($("#t1").val())
    // console.log(locObj)
    // setTimeout(function()) 
    // }, 2000);

    await initMap()
    // Var marker = new google.maps.Marker({position: {lat: 40.743991, lng: -74.032363}, map: map});

    // Configuration for ajax request to server
    var requestConfig = {
        method: "GET",
        url: "/map/all",
        dataType: "json",
    }
    
    $.ajax(requestConfig).then(function(response){

        for(let i=0; i < response.length; i++){
            addMarker({lat: response[i].location.lat, lng: response[i].location.long}, response[i].name)
        }
        
        // let ll = 40.743991;
        // let ln = -74.032363
        // for(let i=0; i < 20; i++){
        //     addMarker({lat: ll, lng: ln})
        //     ll += 0.001
        //     ln += 0.001
        // }
        // addMarker({lat: 40.743991, lng: -74.032363})
        //var marker = new google.maps.Marker({position: {lat: 40.743991, lng: -74.032363}, map: map})
    })

    // $.ajax(requestConfig).then(function(response){
    //     console.log(response)
    // })
    // var requestConfig = {
    //     method: "GET",
    //     url: "/map/all",
    //     dataType: "json",
    // }

    // $.ajax(requestConfig).then(function(response){
    //     console.log(response)
    // })

    // //console.log("Hello World")
    // tacoSalad = "Set in the jQuery"

//    var marker = new google.maps.Marker({position: {lat: 40.743991, lng: -74.032363}, map: map});

})(jQuery)