var mymap = L.map('leafletmap');
mymap.setView([40.775,-73.972], 15);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
}).addTo(mymap);

$('.pure-button').on('click', function(){
  mymap.locate({setView: true, maxZoom: 15});
});

mymap.on('locationfound', onLocationFound);
function onLocationFound(e) {
    console.log(e); 
    // e.heading will contain the user's heading (in degrees) if it's available, and if not it will be NaN. This would allow you to point a marker in the same direction the user is pointed. 
    L.marker(e.latlng).addTo(mymap);
}