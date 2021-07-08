
var geoserver_ip = 'http://121.0.0.1';
var geoserver_port = '8080';

	function getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie !== "") {
			var cookies = document.cookie.split(";");
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === name + "=") {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
	var csrftoken = getCookie("csrftoken");
	
	myHeaders =  {'Content-Type': 'application/json', 'Access-Control-Allow-Credentials' : true,
					'Access-Control-Allow-Origin':'*',
					'Accept': 'application/json'}


 var project_maplayer = new ol.layer.Tile({
	// source: new ol.source.OSM(),
	source: new ol.source.XYZ({
		attributions: ['Powered by Esri',
									 'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'],
		attributionsCollapsible: false,
		url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
		maxZoom: 23
	}),

	zIndex: 0
});

var project_view = new ol.View({
	projection: 'EPSG:4326',
	center: [-81.80808208706726, 27.285095000261222],
	zoom: 7,
});



var Projectmap = new ol.Map({
	layers: [project_maplayer],
	target: 'project_map',
	view: project_view,
    constrainOnlyCenter: true,

});
	

function autocomplete(inp) {
  /*the autocomplete function takes one argument,
  the text field element*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
	  var a, b, i, val = this.value;
	  var ACCESS_TOKEN_KEY = YOUR_MAPBOX_API_KEY
	  /*close any already open lists of autocompleted values*/
	  var URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${val}.json?access_token=${ACCESS_TOKEN_KEY}&types=address,region,poi,country,district,locality,neighborhood,postcode&country=us`
	 
	  fetch(URL,{
		method: 'GET',
		headers: myHeaders,
	  }).then(response => response.json())
	  .then(data => {
		geocode_data = data;
		// console.log(data) 
	  
	  closeAllLists();
	  if (!val) { return false;}
	  currentFocus = -1;
	  /*create a DIV element that will contain the items (values):*/
	  a = document.createElement("DIV");
	  a.setAttribute("id", this.id + "autocomplete-list");
	  a.setAttribute("class", "autocomplete-items");
	  /*append the DIV element as a child of the autocomplete container:*/
	  this.parentNode.appendChild(a);
	  /*for each item in the array...*/
	  for (i = 0; i < geocode_data.features.length; i++) {

		  b = document.createElement("DIV");
		  /*insert a input field that will hold the current array item's value:*/
		  b.innerHTML += geocode_data.features[i].place_name;
		  // b.innerHTML += "<input type='hidden' value='" + geocode_data.features[i].place_name + "'>";
		  b.innerHTML += `<input type='hidden' style="display: none;" id=${i}-center-cc  
		  coordinates='${geocode_data.features[i].center}' value='${geocode_data.features[i].place_name}'>`;
		  
		  /*execute a function when someone clicks on the item value (DIV element):*/
		  b.addEventListener("click", function(e) {
			  /*insert the value for the autocomplete text field:*/
			  var input_tag = this.getElementsByTagName("input")[0]
			  inp.value = input_tag.value;
			  inp.setAttribute("coordinates", input_tag.getAttribute('coordinates'));

			  /*close the list of autocompleted values,
			  (or any other open lists of autocompleted values:*/
			  closeAllLists();
		  });
		  a.appendChild(b);
		}

	  })
	  .catch(error => {
	console.error('There has been a problem with your fetch operation:', error);
	});


	  });
  // });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
	  var x = document.getElementById(this.id + "autocomplete-list");
	  if (x) x = x.getElementsByTagName("div");
	  if (e.keyCode == 40) {
		/*If the arrow DOWN key is pressed,
		increase the currentFocus variable:*/
		currentFocus++;
		/*and and make the current item more visible:*/
		addActive(x);
	  } else if (e.keyCode == 38) { //up
		/*If the arrow UP key is pressed,
		decrease the currentFocus variable:*/
		currentFocus--;
		/*and and make the current item more visible:*/
		addActive(x);
	  } else if (e.keyCode == 13) {
		/*If the ENTER key is pressed, prevent the form from being submitted,*/
		e.preventDefault();
		if (currentFocus > -1) {
		  /*and simulate a click on the "active" item:*/
		  if (x) x[currentFocus].click();
		}
	  }
  });
  function addActive(x) {
	/*a function to classify an item as "active":*/
	if (!x) return false;
	/*start by removing the "active" class on all items:*/
	removeActive(x);
	if (currentFocus >= x.length) currentFocus = 0;
	if (currentFocus < 0) currentFocus = (x.length - 1);
	/*add class "autocomplete-active":*/
	x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
	/*a function to remove the "active" class from all autocomplete items:*/
	for (var i = 0; i < x.length; i++) {
	  x[i].classList.remove("autocomplete-active");
	}
  }
  function closeAllLists(elmnt) {
	/*close all autocomplete lists in the document,
	except the one passed as an argument:*/
	var x = document.getElementsByClassName("autocomplete-items");
	for (var i = 0; i < x.length; i++) {
	  if (elmnt != x[i] && elmnt != inp) {
		x[i].parentNode.removeChild(x[i]);
	  }
	}
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
	  closeAllLists(e.target);
  });
}

function CenterMap() {
	var [long, lat] = document.getElementById("myInput").getAttribute("coordinates").split(",").map(Number)
    console.log("Long: " + long + " Lat: " + lat);
    Projectmap.getView().setCenter(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:4326'));
    Projectmap.getView().setZoom(15);

   //  			Projectmap.renderSync() 
			// Projectmap.updateSize()
}

/*initiate the autocomplete function on the "myInput" element */
autocomplete(document.getElementById("myInput"));
document.getElementById("geocodingSubmit").addEventListener('click', function(e){

	e.preventDefault();
	CenterMap();
})



var highlightStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255,255,255,0.7)',
  }),
  stroke: new ol.style.Stroke({
    color: '#3399CC',
    width: 3,
  }),
});
