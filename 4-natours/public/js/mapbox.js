/* eslint-disable */

// Move to index.js by base.pug using parcel-bundle module
// const locations = JSON.parse(document.getElementById('map').dataset.locations); // dataset.locations is call from "data-locations" at tour.pug // we don't need data- from "data-locations"
// console.log(locations);

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWlraXlvc2hpIiwiYSI6ImNsNDhvN3Y3aDB1YWoza213dXU4cHk2NTYifQ.AT-oYPsU-EI94ag2_QORnA';

  // mapbox documentation from https://docs.mapbox.com/mapbox-gl-js/guides/
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mikiyoshi/cl48oognb007b14nxu33r1c5h',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 4,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup

    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
