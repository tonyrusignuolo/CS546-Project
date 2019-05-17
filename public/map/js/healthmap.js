// JS and JQuery to manipulate google maps API
// Creates a variable for our map object
var map;
var markers = [];
var prevMarker;
var infoWindow;
var currentprac = {};

// Function to initialize the google maps
async function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.743991, lng: -74.032363},
        zoom: 12
    });
    infoWindow = new google.maps.InfoWindow({
        content: "None Set"
    })
}


// Function to add map marker to map
function addMarker(coords, name, markerinfo, p){
    var marker = new google.maps.Marker({
        position: coords,
        title: name,
        animation: google.maps.Animation.DROP,
        map: map,
        pinfo: p,
        info: markerinfo
    });


    // Function to add animation to map marker. Also updates current practitioner variable and sets the content of the info window
    function toggleBounce(){

        // Set animation of any other marker to off when another is pressed
        if(prevMarker && prevMarker.getAnimation() !== null && prevMarker !== marker){
            prevMarker.setAnimation(null)
            marker.setAnimation(google.maps.Animation.BOUNCE)
            
            currentprac = marker.pinfo
            infoWindow.setContent(marker.info)
            infoWindow.open(map, marker)

            prevMarker = marker
        }
        else{
            if(marker.getAnimation() !== null){
                marker.setAnimation(null)

                infoWindow.close()

            }
            else{
                marker.setAnimation(google.maps.Animation.BOUNCE)
                
                currentprac = marker.pinfo
                infoWindow.setContent(marker.info)
                infoWindow.open(map, marker)
                
                prevMarker = marker
            }
        }
        
    }

    // Adds listener for bounce toggle and info box
    marker.addListener('click', toggleBounce)
    markers.push(marker);
}

// Function to set map markers on all
function setMapOnAll(map){
    for(let i=0; i < markers.length; i++){
        markers[i].setMap(map)
    }
}

// Function to clear all map markers
function clearMarkers(){
    setMapOnAll(null)
}

// Function to remove all map markers
function deleteMarkers(){
    clearMarkers();
    markers = [];
}

// Function to get the practitioner data
function getPracData(prac){
    let newObj = {
        id: prac._id,
		name: prac.name,
		providers: [],
		service: [],
		price: []
	}

	// Put insurance providers in an array
	for(let i=0; i < prac.providers.length; i++){
        newObj.providers.push(prac.providers[i])
	}

	for(let i=0; i < prac.procedures.length; i++){
        let obj = prac.procedures[i]
        let key = Object.keys(obj)
        let val = Object.values(obj)
        for(let j=0; j < key.length; j++){
			newObj.service.push(key[j])
			newObj.price.push(val[j])
        }
	}
	
	// DO it the above way or just set the standard array of objects in, handlebars handling could be easier
    

    return(newObj)

}


// Function to format out html string for the info window
function formatHTMLString(prac){
    let heading = "<h5>" + prac.name + "</h5>"
    let ins = "<p><b>Accepted Insurance</b></p><p>"
    for(let i=0; i < prac.providers.length; i++){
        if(i === prac.providers.length-1){
            ins = ins + prac.providers[i]
        }
        else{
            ins = ins + prac.providers[i] + ", "    
        }
    }
    ins = ins + "</p>"

    let procs = "<p><b>Services</b></p><p>"
    for(let i=0; i < prac.procedures.length; i++){
        let obj = prac.procedures[i]
        let key = Object.keys(obj)
        let val = Object.values(obj)
        for(let j=0; j < key.length; j++){
            if(i === prac.procedures.length-1){
                procs = procs + key[j] + ": $" + String(val[j])
            }
            else{
                procs = procs + key[j] + ": $" + String(val[j]) + ", "
            }
        }
    }
    procs = procs + "</p>"
    
    //<button class="btn btn-primary btn-round" data-toggle="modal" data-target="#appointmentCreate">Create Appointment</button>
    let button = '<button class="btn btn-primary btn-sm" id="book-it" data-toggle="modal" data-target="#appointmentCreate">Book Appointment</button>'

    return(heading + ins + procs + button)
}


(async function($){
    // Disabled inate map functionality so the google API loads the map, and the AJAX request to server can be called to populate the map after object creation
    // Call to google map API for map generation
    await initMap()
    // Ajax request to get all from server
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

    for(let i=0; i < p.length; i++){
        // Formats a content string for the info window
        let contentString = formatHTMLString(p[i])

        // Function call to update the current practitioner for form fill
        let pracData = getPracData(p[i])

        addMarker({lat: p[i].location[0].lat, lng: p[i].location[1].long}, p[i].name, contentString, pracData)
    }
    
    // Set event listener for submission form
    $("#search-params").submit(function(event){
        event.preventDefault();
        // Clear error message
        $("#errmess").text("")
        // ins variable to get insurance selection
        var ins = $("#insurance-drop").val()
        // prc variable to get procedure selection
        var prc = $("#procedure-drop").val()
        
        if(ins !== '-' || prc !== '-'){
            var adata = {insurance: ins, procedure: prc}
            // Ajax request to load matches
            var r = function(){
                var tmp = null;
                $.ajax({
                    'async': false,
                    'type': "GET",
                    'data': adata,
                    'dataType': 'json',
                    'url': "/map/match",
                    'success': function (data) {
                        tmp = data;
                    }
                });
                return tmp;
            }();
            

            deleteMarkers();
            // If there are search results then we add the corresponding markers to the map
            if(r !== undefined && r !== null && r.length > 0){
                for(let i=0; i < r.length; i++){
                    
                    // Formats a content string for the info window
                    let contentString = formatHTMLString(r[i])

                    // Function call to update the current practitioner for form fill
                    let pracData = getPracData(r[i])

                    addMarker({lat: r[i].location[0].lat, lng: r[i].location[1].long}, r[i].name, contentString, pracData)
                }
            }
            // Otherwise we display a message that says there were no search results
            else{
                // Set error message if there are no results
                $("#errmess").text("Sorry, there weren't any results for that search")
            }
        }

        // Otherwise reload all
        else{
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
            deleteMarkers();
            for(let i=0; i < p.length; i++){

                // Formats a content string for the info window
                let contentString = formatHTMLString(p[i])

                // Function call to update the current practitioner for form fill
                let pracData = getPracData(p[i])
                
                addMarker({lat: p[i].location[0].lat, lng: p[i].location[1].long}, p[i].name, contentString, pracData)
            }
        }
        
        event.preventDefault();
    });

    // Function sets a listener to a button that will be created dynamically but doesnt exist on dom ready
    $('body').on('click', '#book-it', function() {
        var login = function () {
            var tmp = null;
            $.ajax({
                'async': false,
                'type': "GET",
                'dataType': 'json',
                'url': "/map/checklogin",
                'success': function (data) {
                    tmp = data;
                }
            });
            return tmp;
        }();

        // If the user is logged in
        if(login !== null && login !== undefined){
            //console.log(currentprac)
            $("#useremail").val(login.email)
            $("#userId").val(login._id)
            $("#practitionerId").val(currentprac.id)
			$("#pracname").val(currentprac.name)
			
			// Removes all optinos from drop down to add new ones
			$("#procdrop").find('option').remove().end()

			// Adds all the services to the procedure drop down
			$.each(currentprac.service, function(index, value){

				$("#procdrop").append($('<option/>', {
					value: index,
					text: value
				}))
			})
			
			// Sets initial value for cost based on default selection
			let pstring = "$" + String(currentprac.price[0])
			$("#cost").val(pstring)

        }
        else{
            // If te user is not logged in, we redirect to the loggin
            window.location = "/profile/login"
            return;
        }

	})

	// Listens for a change to the selector in order to change cost accordingly
	$('body').on('change', "#procdrop", function(e){
		let priceindex = this.options[e.target.selectedIndex].value
		let price = "$" + String(currentprac.price[priceindex])
		$("#cost").val(price)
	})

})(jQuery)