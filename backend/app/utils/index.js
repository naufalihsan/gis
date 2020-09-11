const utils = {}


function fromGeoJson(json) {
    var data = json.properties;
    data.geometry = json.geometry;

    return {
        data: data,
        type: data.geometry.type,
    };
}


function toGeoJson(data) {
    var features = [];

    for (d of data) {
        var feature = {
            type: "Feature",
            properties: {},
            geometry: {}
        }

        feature.geometry = d.geometry;
        feature.properties = {
            id: d.id,
            nama: d.nama,
        };

        if (d.deskripsi) {
            feature.properties.deskripsi = d.deskripsi
        }

        if (d.luas_area) {
            feature.properties.luas_area = d.luas_area
        }

        if (d.panjang_garis) {
            feature.properties.panjang_garis = d.panjang_garis
        }

        features.push(feature);
    }

    return features;
}


utils.fromGeoJson = fromGeoJson;
utils.toGeoJson = toGeoJson;

module.exports = utils