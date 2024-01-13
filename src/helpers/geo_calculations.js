export const validLatitude = (latitude) => {
    return latitude <= 90.0 && latitude >= - 90.0
}

export const validLongitude = (longitude) => {
    return longitude <= 180.0 && longitude >= -180.0
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export const geoDistance = (lat1, lon1, lat2, lon2, unit) => {
    // console.log('geo distance')
    // console.log(lat1)
    // console.log(lon1)
    // console.log(lat2)
    // console.log(lon2)
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        if (unit == "M") { dist = dist * 0.9993373519999998 }
        // console.log('distance')
        // console.log(dist)
        return dist;
    }
}
// export const updateFeatureRanges = (features,pointData, geoJsonGeoProperty, units = "M") => {

//     let updatedPoints = pointData.map(point => {
//         point.featureRanges = featureRanges(features, point.lat, point.lon, geoJsonGeoProperty, units)
//     })
//     pointData.forEach(point => {point.featureRanges = featureRanges(features, point.lat, point.lon, geoJsonGeoProperty, units)})
// }


export const featureRanges = (features, lat, lon, geoJsonGeoProperty, units = "M", max_distance = 100) => {
    console.log('features', features)
    console.log('lat', lat)
    console.log('lon', lon)
    console.log('geoJsonGeoProperty', geoJsonGeoProperty)
    console.log('units', units)
    console.log('max_distance', max_distance)
    let featureRanges = []
    features.forEach(feature => {
        let distance = geoDistance(lat, lon, parseFloat(feature.INTPTLAT10), parseFloat(feature.INTPTLON10), units)
        // console.log(distance)
        if (distance <= max_distance) {
            featureRanges.push({ id: feature[geoJsonGeoProperty], distance: distance })
        }
    })
    console.log('feature ranges')
    console.table(featureRanges)
    return featureRanges
}

export const featuresInRangeNew = (featureRanges, range, units = "M") => {
    return featureRanges.filter(featureRange => {
        return featureRange.distance <= range
    })
}


export const featuresInRangeOfPointsNew = (features, points, pointRanges, range, geoJsonGeoProperty, units = "M") => {
    // console.log('feature in range')
    // console.log(points.length)
    // console.log(features)
    // console.log(range)
    let selectedFeatureIds = []
    if (points.length > 0) {
        points.forEach(point => {

            let newFeaturesInRange = featuresInRangeNew(pointRanges[point.id], range, units)
            // console.log('new features in range')
            // console.log(newFeaturesInRange)
            selectedFeatureIds = selectedFeatureIds.concat(newFeaturesInRange)
        });
    }

    let uniqueSelectedFeatureIds = [...new Set(selectedFeatureIds)].map(feature => { return feature.id });
    // console.log('unique selected feature ids', uniqueSelectedFeatureIds)
    let selectedFullFeatures = []
    if (features && features.length > 0) {

        selectedFullFeatures = features.filter(feature => { return uniqueSelectedFeatureIds.includes(feature[geoJsonGeoProperty]) })
    }
    // console.log('unique selected features', selectedFullFeatures)

    return selectedFullFeatures

}

export const featuresInRangeOfPointsCsvNew = (features, points, pointRanges, range, geoJsonGeoProperty, units = "M") => {
    // console.log('feature in range csv')
    // console.log(points.length)
    // console.log(features)
    // console.log(range)
    // console.log(pointRanges)

    let selectedFeaturesCSV = []
    if (points.length > 0) {
        // console.log('points', points)
        points.forEach(point => {
            let newFeatureIdsInRangewithRange = featuresInRangeNew(pointRanges[point.id], range, units).map(feature => { return feature.id })
            // console.log('new feature ids in range')
            // console.log(newFeatureIdsInRangewithRange)
            let selectedFullFeatures = features.filter(feature => { return newFeatureIdsInRangewithRange.includes(feature[geoJsonGeoProperty]) })
            // console.log('new features in range here')
            // console.log(selectedFullFeatures)
            selectedFullFeatures.forEach(feature => {
                let distance = geoDistance(point.Latitude, point.Longitude, parseFloat(feature.INTPTLAT10), parseFloat(feature.INTPTLON10), units);
                selectedFeaturesCSV.push([point.Number, point.Title, point.Color, distance, feature]);

            })
        });
    }
    // console.log('selected features')
    // console.log(selectedFeatures)
    // this should be [[point.Number, point.Title, range, Feature],...]
    // console.log('selectedFeaturesCSV')
    // console.log(selectedFeaturesCSV)

    return selectedFeaturesCSV

}









export const featuresInRange = (features, lat, lon, range, units = "M") => {
    // console.log('running')
    // console.log(lat)
    // console.log(lon)
    // console.log(range)
    // console.log(features)
    // console.log(features[0].INTPTLAT10)
    // console.log(features[0].INTPTLON10)
    return features.filter(feature => {
        return geoDistance(lat, lon, parseFloat(feature.INTPTLAT10), parseFloat(feature.INTPTLON10), units) <= range
    })
}

export const featuresInRangeOfPoints = (features, points, range, units = "M") => {
    // console.log('feature in range')
    // console.log(points.length)
    // console.log(features)
    // console.log(range)
    let selectedFeatures = []
    if (points.length > 0) {
        points.forEach(point => {
            let newFeaturesInRange = featuresInRange(features, point.Latitude, point.Longitude, range, units)
            // console.log('new features in range')
            // console.log(newFeaturesInRange)
            selectedFeatures = selectedFeatures.concat(newFeaturesInRange)
        });
    }
    // console.log('selected features')
    // console.log(selectedFeatures)

    return [...new Set(selectedFeatures)]

}

export const featuresInRangeCsv = (features, lat, lon, range, units = "M") => {
    // console.log('running')

    let featuresInRange = features.filter(feature => {
        return geoDistance(lat, lon, parseFloat(feature.INTPTLAT10), parseFloat(feature.INTPTLON10), units) <= range
    })
    // console.log(featuresInRange)
    let featuresInRangeWithRange = []
    featuresInRange.forEach(feature => {
        // let distance = geoDistance(lat, lon, parseFloat(feature.properties.INTPTLAT10), parseFloat(feature.properties.INTPTLON10), units)
        featuresInRangeWithRange.push(feature)
    })
    return featuresInRangeWithRange
}

export const featuresInRangeOfPointsCsv = (features, points, range, units = "M") => {
    // console.log('feature in range')
    // console.log(points.length)

    let selectedFeaturesCSV = []
    if (points.length > 0) {
        // console.log('points', points)
        points.forEach(point => {
            let newFeaturesInRangewithRange = featuresInRange(features, point.Latitude, point.Longitude, range, units)
            // console.log('new features in range')
            // console.log(newFeaturesInRange)
            newFeaturesInRangewithRange.forEach(feature => {
                let distance = geoDistance(point.Latitude, point.Longitude, parseFloat(feature.INTPTLAT10), parseFloat(feature.INTPTLON10), units);
                selectedFeaturesCSV.push([point.Number, point.Title, point.Color, distance, feature]);

            })
        });
    }
    // console.log('selected features')
    // console.log(selectedFeatures)
    // this should be [[point.Number, point.Title, range, Feature],...]
    // console.log('selectedFeaturesCSV')
    // console.log(selectedFeaturesCSV)

    return selectedFeaturesCSV

}

export const featuresInBoundingBox = (features, latTop, lonLeft, latBottom, lonRight, range) => {
    console.log('running')
    console.log('featuresInBoundingBox', features)
    return features.filter(feature => {
        return featureInBoundingBox(feature, latTop, lonLeft, latBottom, lonRight)
    })
}

export const featureInBoundingBox = (feature, latTop, lonLeft, latBottom, lonRight) => {
    // console.log('running')
    // console.log('featureInBoundingBox', feature)
    // console.log('latTop', latTop)
    // console.log('lonLeft', lonLeft)
    // console.log('latBottom', latBottom)
    // console.log('lonRight', lonRight)
    if (lonLeft > lonRight) {
        [lonLeft, lonRight] = [lonRight, lonLeft]
    }
    // console.log('feature.INTPTLAT10', feature.INTPTLAT10)
    // console.log('feature.INTPTLAT10 < latTop', feature.INTPTLAT10 <= latTop)
    // console.log('feature.INTPTLAT10 > latBottom', feature.INTPTLAT10 >= latBottom)
    // console.log('feature.INTPTLON10 > lonLeft', feature.INTPTLON10 >= lonLeft)
    // console.log('feature.INTPTLON10 < lonRight', feature.INTPTLON10 <= lonRight)
    return parseFloat(feature.INTPTLAT10) <= latTop && parseFloat(feature.INTPTLAT10) >= latBottom && parseFloat(feature.INTPTLON10) >= lonLeft && parseFloat(feature.INTPTLON10) <= lonRight
}
