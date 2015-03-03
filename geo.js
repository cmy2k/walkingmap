L.AwesomeMarkers.Icon.prototype.options.prefix = 'ion';

function makeMarkersFromLegs(path, legs, map) {
  var markers = [];

  // calculate coordiantes
  var coordinates = [];
  var polypath = L.polyline(path[0].features[0].geometry.coordinates);
  var length = L.GeometryUtil.length(polypath) * 0.0000621371;

  // find location of end points along path
  var distance = 0;
  var markers = [];

  // add start and end markers
  var startMarker = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'green'
  });

  var startCoordinates = L.GeometryUtil.interpolateOnLine(map, polypath, 0).latLng;

  markers.push(L.marker([startCoordinates.lng, startCoordinates.lat], {icon: startMarker}));

  var endMarker = L.AwesomeMarkers.icon({
    icon: 'ribbon-a',
    markerColor: 'orange'
  });

  var endCoordinates = L.GeometryUtil.interpolateOnLine(map, polypath, 1).latLng;

  markers.push(L.marker([endCoordinates.lng, endCoordinates.lat ], {icon: endMarker}));

  _.forEach(legs[0], function(leg) {
    if (leg.dist !== 0) {
      distance += leg.dist;
      var ratio = distance / length;
      var location = L.GeometryUtil.interpolateOnLine(map, polypath, ratio).latLng;
      var marker = L.marker([location.lng, location.lat], {icon: L.AwesomeMarkers.icon({
        icon: 'android-walk', markerColor: 'blue'
      })});
      var popup = "".concat(
          "<b>", 
          leg.date, 
          "</b><br>Distance: ", 
          leg.dist, 
          " miles<br>Calories burned: ",
          leg.cals);
      marker.bindPopup(popup);
      markers.push(marker);
    }
  });

  return markers;
}