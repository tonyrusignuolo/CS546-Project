// Simple JS for manipulating the maps page
var map;
async function initMap() {
    console.log("Jello Man")
    //console.log(tacoSalad)
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.743991, lng: -74.032363},
        zoom: 12
    });
}

function addMarker(coords){
    var marker = new google.maps.Marker({position: coords, map: map})
}


// var tacoSalad;
(async function($){
    // var locObj = JSON.parse($("#t1").val())
    // console.log(locObj)
    // setTimeout(function(){
        
    // }, 2000);
    await initMap()
    //var marker = new google.maps.Marker({position: {lat: 40.743991, lng: -74.032363}, map: map});
    

    var requestConfig = {
        method: "GET",
        url: "/map/all",
        dataType: "json",
    }
    
    $.ajax(requestConfig).then(function(response){
        console.log(response)
        let ll = 40.743991;
        let ln = -74.032363
        for(let i=0; i < 20; i++){
            addMarker({lat: ll, lng: ln})
            ll += 0.001
            ln += 0.001
        }
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