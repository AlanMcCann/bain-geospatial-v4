// To run node create_layer_label_geojson_denver.js
var fs = require('fs');
const path = require('path');
var turfCentroid = require('turf-centroid');
var geojson = require('./public/denver_data.json');

var result = {
    "type": "FeatureCollection",
    "features": []
};

for (var i = 0; i < geojson.features.length; i++) {
    result.features.push(
        {
            "type": "Feature",
            "properties": { "id": geojson.features[i].properties.ZCTA5CE10 },
            "geometry": turfCentroid(geojson.features[i]).geometry
        }
    );
}
// console.log(result)
fs.writeFile(path.join("./public", `denver_labels.json`), JSON.stringify(result, null, '  '), () => { });
