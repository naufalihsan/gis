var mymap = L.map('mapid').setView([-6.2, 107.257], 9);

const src = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF1ZmFsaWhzYW4iLCJhIjoiY2pvOGhjaDl5MTNvaTN3cHVncmU4bWFjaSJ9.AlB4TqOHs7enzHARvxO2Nw';

L.tileLayer(src, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, ' +
        'Naufal Ihsan',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);


var info = L.control();

info.onAdd = function () {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    var info;
    var render;

    if (props) {

        info = `Point`

        if (props.luas_area) {
            info = `Luas Area : ${props.luas_area} <br> ${props.deskripsi}`
        }

        if (props.panjang_garis) {
            info = `Panjang Garis : ${props.panjang_garis} <br> ${props.deskripsi}`
        }

        render = `
            <b>${props.nama} (${props.id})</b> <br>
            <p>${info}</p>
        `;
    }

    this._div.innerHTML = `
        <h4>GeoJSON Property</h4> 
        ${props ? render : 'Hover over a GeoJSON Feature'}
    `;
};

info.addTo(mymap);

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.025, 0.05, 0.075, 0.1, 0.125, 0.15, 0.175],
        labels = ['Luas Area'],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            `<i style="background:${getColor(from + 0.001)}"></i>${from} ${to ? ' &ndash; ' + to : '+'}`
        )
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(mymap);

function getColor(d) {
    return d > 0.175 ? '#800026' :
        d > 0.15 ? '#BD0026' :
            d > 0.125 ? '#E31A1C' :
                d > 0.1 ? '#FC4E2A' :
                    d > 0.075 ? '#FD8D3C' :
                        d > 0.05 ? '#FEB24C' :
                            d > 0.025 ? '#FED976' : '#FFEDA0';
}

function highlightFeature(e) {
    var layer = e.target;

    if (layer.feature.geometry.type == "Polygon") {
        var polygon = layer.feature;

        layer.setStyle({
            weight: 5,
            color: getColor(polygon.properties.luas_area),
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    info.update(layer.feature.properties);
}

function onEachFeature(feature, layer) {
    var props = feature.properties;

    var popupContent = `id : ${props.id} <br>
                        nama : ${props.nama}`;

    layer.bindPopup(popupContent);

    layer.on({
        mouseover: highlightFeature,
    });
}

fetch('http://localhost:3000/api/v1')
    .then(response => response.json())
    .then(geoJson => {
        var features = geoJson.features;
        for (feature of features) {
            L.geoJSON(feature, { onEachFeature: onEachFeature }).addTo(mymap);
        }
    });
