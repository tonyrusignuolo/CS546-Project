// JS and JQuery to manipulate google maps API
// Creates a variable for our map object
var map;
// Function to initialize the google maps
async function initMap() {
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

    // Function to add animation to map marker
    function toggleBounce(){
        if(marker.getAnimation() !== null){
            marker.setAnimation(null)
        }
        else {
            marker.setAnimation(google.maps.Animation.BOUNCE)
        }

        console.log(p)

    }
    marker.addListener('click', toggleBounce)
}


(async function($){
    
    // Disabled inate map functionality so the google API loads the map, and the AJAX request to server can be called to populate the map after object creation
    // Call to google map API for map generation
    await initMap()

    // Var marker = new google.maps.Marker({position: {lat: 40.743991, lng: -74.032363}, map: map});

    // Configuration for ajax request to server
    var requestConfig = {
        method: "GET",
        url: "/map/all",
        dataType: "json",
    }
    
    // const tmp
    // $.ajax(requestConfig).then(function(response){
    //     tmp = response;
    //     for(let i=0; i < response.length; i++){
    //         addMarker({lat: response[i].location[0].lat, lng: response[i].location[1].long}, response[i].name)
    //     }
        
    // })

    // console.log(tmp)


    // Alternate method for ajax request stores allPractitioners in variable p
    var p = function () {
        var tmp = null;
        $.ajax({
            'async': false,
            'type': "GET",
            'dataType': 'json',
            'url': "/map/all",
            'success': function (data) {
                tmp = data;
            }
        });
        return tmp;
    }();


    var insuranceList = []
    var procedureList = []


    for(let i=0; i < p.length; i++){
        addMarker({lat: p[i].location[0].lat, lng: p[i].location[1].long}, p[i].name)
        
        for(let j=0; j < p[i].procedures.length; j++){
            let zz = p[i].procedures[j]
            for (let name in zz){
                if(!procedureList.includes(name)){
                    procedureList.push(name)
                }
            }
        }

        for(let j=0; j < p[i].providers.length; j++){
            let zz = p[i].providers[j]
            if(!insuranceList.includes(zz)){
                insuranceList.push(zz)
            }
        }
    }
    // console.log(insuranceList)
    // console.log(procedureList)

    for(let i=0; i < insuranceList.length; i++){
        var n = "<option>" + String(insuranceList[i]) + "</option>"
        $("#insurance-drop").append(n)
    }

    for(let i=0; i < procedureList.length; i++){
        var n = "<option>" + String(procedureList[i]) + "</option>"
        $("#procedure-drop").append(n)
    }


    // Set event listener for submission form
    $("#search-params").submit(function(event){
        
        console.log($("#insurance-drop").val())
        console.log($("#procedure-drop").val())
        
        event.preventDefault();
    })

})(jQuery)