var json = require('./geo.json');
var utils = require('../utils/index');

var polygon = [], line = [], point = [];

var features = json.features;
for (feature of features) {

    var geoJson = utils.fromGeoJson(feature);

    switch (geoJson.type) {
        case 'Polygon':
            polygon.push(geoJson.data);
            break;
        case 'LineString':
            line.push(geoJson.data);
            break;
        case 'Point':
            point.push(geoJson.data);
            break;
        default:
            break;
    }
}

const data = {}

data.polygon = polygon;
data.line = line;
data.point = point;

module.exports = data