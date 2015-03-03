function makeMarkersFromLegs(path, legs, map) {
  var markers = [];

  // calculate coordiantes
  var coordinates = [];
  var polypath = L.polyline(path[0].features[0].geometry.coordinates);
  var length = L.GeometryUtil.length(polypath) * 0.0000621371;

  // find location of end points along path
  var distance = 0;
  var markers = [];
  _.forEach(legs[0], function(leg) {
    if (leg.dist !== 0) {
      distance += leg.dist;
      var ratio = distance / length;
      var location = L.GeometryUtil.interpolateOnLine(map, polypath, ratio).latLng;
      var marker = L.marker([location.lng, location.lat]);
      marker.bindPopup("<b>" + leg.date + "</b><br>Distance: " + leg.dist + " miles<br>Calories burned: " + leg.cals)
      markers.push(marker);
    }
  });

  return markers;
}