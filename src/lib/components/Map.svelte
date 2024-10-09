<script>
  import { onMount } from "svelte";
  export let zipcode = "10001"; // Default zip code, but now we can pass it in as a prop
  let map;
  let mapElement;
  let markers = [
    { lat: 40.748817, lng: -73.985428 }, // Marker 1 (e.g., Empire State Building)
    { lat: 40.73061, lng: -73.935242 }, // Marker 2 (e.g., Random NYC)
  ];

  // Geocode and center the map based on the provided zip code
   window.initMap = function() {
    const geocoder = new google.maps.Geocoder();

    // Get LatLng for the zip code
    geocoder.geocode({ address: zipcode }, (results, status) => {
      if (status === "OK") {
        const centerPosition = results[0].geometry.location;

        map = new google.maps.Map(mapElement, {
          zoom: 12,
          center: centerPosition,
          mapId: "DEMO_MAP_ID", // Replace with your mapId
        });

        // Add markers to the map
        markers.forEach((markerPos) => {
          new google.maps.Marker({
            position: markerPos,
            map: map,
            title: "Marker Title",
          });
        });
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  // Dynamically add Google Maps API
  function loadGoogleMapsScript() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDygv6AHcu52-8mmHRgid42HJFX6Au9Y-E&libraries=places&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
  }

  onMount(() => {
    loadGoogleMapsScript();
  });
</script>

<style>
  #map {
    height: 500px;
    width: 100%;
    border: 2px solid black;
  }
</style>

<div id="map" bind:this={mapElement}></div>
