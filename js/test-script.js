
    var map = L.map('map',{
    center: [74.60068, -57.15637],
    zoom: 7
    });

    var map2 = L.map('map2',{
    center: [60.76586, -48.16131],
    zoom: 7
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map2);


    var marker = L.marker([74.60068, -57.15637]).addTo(map);
    marker.bindPopup("<b>Devil's Thumb</b>").openPopup();

    var markerTwo = L.marker([60.76586, -48.16131]).addTo(map2);
    markerTwo.bindPopup("<b>Cape Desolation</b>").openPopup();