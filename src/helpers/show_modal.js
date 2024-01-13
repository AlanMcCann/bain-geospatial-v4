// export default {
//   identifyFeatures(map, popup, location, layer, fields) {
//     var identifiedFeatures = map.queryRenderedFeatures(location.point, {layers: [layer]});
//     console.log(identifiedFeatures);
//     popup.remove();
//     if (identifiedFeatures != '') {
//       var popupText = "";
//       var i = 0
//       for (i = 0; i < fields.length; i++) {
//         popupText += "<strong>" + fields[i] + ":</strong> " + identifiedFeatures[0].properties[fields[i]] + "<" + "br" + ">"
//       }
//       popup.setLngLat(location.lngLat)
//         .setHTML(popupText)
//         .addTo(map);
//     }
//   }

// Original ES6 Class https://github.com/tobinbradley/mapbox-gl-pitch-toggle-control
export default class ShowModal {
  constructor() {

  }

  onAdd(map) {
    this._map = map;

    this._btn = document.createElement("button");
    this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-show-modal";
    this._btn.type = "button";
    this._btn["aria-label"] = "Show Modal";
    let iconNode = document.createElement("i")
    iconNode.className = "far fa-file-download"
    this._btn.appendChild(iconNode)
    let textnode = document.createTextNode("Download");         // Create a text node
    this._btn.appendChild(textnode);
    this._btn.onclick = function () {
      let acceptTerms = confirm("Do you accept the terms?");
      // console.log(acceptTerms)
      // console.log('modal')

      // let answer =  alert( acceptTerms )
      // console.log(answer)
      // $('#my-modal').modal('show');

      // if (map.getPitch() === 0) {
      //   let options = { pitch: _this._pitch, bearing: _this._bearing };
      //   if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
      //     options.zoom = _this._minpitchzoom;
      //   }
      //   map.easeTo(options);
      //   _this._btn.className =
      //     "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d";
      // } else {
      //   map.easeTo({ pitch: 0, bearing: 0 });
      //   _this._btn.className =
      //     "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
      // }
    };

    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    this._container.appendChild(this._btn);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
