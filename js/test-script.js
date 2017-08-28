
    var map = L.map('map',{
    center: [60.76586, -48.16131],
    zoom: 7
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker = L.marker([60.76586, -48.16131]).addTo(map);
    marker.bindPopup("<b>Cape Desolation (Essay 2)</b>").openPopup();

    var map2 = L.map('map2',{
    center: [60.72006, -46.0358],
    zoom: 7
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map2);

    var markerTwo = L.marker([60.72006, -46.0358]).addTo(map2);
    markerTwo.bindPopup("<b>Julianeshaab(Essay 3)</b>").openPopup();

    var map3 = L.map('map3',{
    center: [60.82859, -45.7808],
    zoom: 7
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map3);

    var markerThree = L.marker([60.82859, -45.7808]).addTo(map3);
    markerThree.bindPopup("<b>Kakortok(Essay 4)</b>").openPopup();

    var map4 = L.map('map4',{
    center: [66.0927, -53.33587],
    zoom: 7
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map4);

    var markerFour= L.marker([66.0927, -53.33587]).addTo(map4);
    markerFour.bindPopup("<b>Karsut Fiord(Essay 6)</b>").openPopup();

    var map5 = L.map('map5',{
    center: [72.78236, -56.14545],
    zoom: 7
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map5);

    var markerFive= L.marker([72.78236, -56.14545]).addTo(map5);
    markerFive.bindPopup("<b>Upernavik(Essay 9)</b>").openPopup();
