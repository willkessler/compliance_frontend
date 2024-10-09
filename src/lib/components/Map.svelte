<script>
  import { onMount } from "svelte";
  export let zipcode = "10001"; // Default zip code, but now we can pass it in as a prop
  let map;
  let mapElement;
  let markers = [];

  async function fetchFromGoogleMaps(endpoint, params) {
    const url = new URL('/api/courts', window.location.origin);
    url.searchParams.append('endpoint', endpoint);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url);
    return await response.json();
  }

  // Geocode and center the map based on the provided zip code, then search for municipal courts
  window.initMap = async function() {
    const { Map, Marker } = await google.maps.importLibrary("maps");
    
    // Geocode the zipcode
    const geocodeResult = await fetchFromGoogleMaps('geocode/json', { address: zipcode });
    if (geocodeResult.status === "OK") {
      const centerPosition = geocodeResult.results[0].geometry.location;

      map = new Map(mapElement, {
        zoom: 11,
        center: centerPosition,
        mapId: "DEMO_MAP_ID", // Replace with your mapId
      });

      // Search for municipal courts
      const placesResult = await fetchFromGoogleMaps('place/textsearch/json', {
        query: 'municipal court',
        location: `${centerPosition.lat},${centerPosition.lng}`,
        radius: 32187
      });

      if (placesResult.status === "OK") {
        placesResult.results.forEach(place => createMarker(place, Marker));
      }
    } else {
      console.error("Geocode was not successful for the following reason: " + geocodeResult.status);
    }
  }

  function createMarker(place, Marker) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new Marker({
      map,
      position: place.geometry.location,
      title: place.name,
    });

    markers.push(marker);

    marker.addListener("click", async () => {
      const placeDetails = await fetchFromGoogleMaps('place/details/json', { place_id: place.place_id, fields: 'name,formatted_address,website,formatted_phone_number' });
      
      if (placeDetails.status === "OK") {
        const result = placeDetails.result;
        const infowindow = new google.maps.InfoWindow({
          content: `
            <div class="info-window">
              <h3>${result.name}</h3>
              <p>${result.formatted_address}</p>
              ${result.website ? `<p>Website: <a href="${result.website}" target="_blank">${result.website}</a></p>` : ''}
              ${result.formatted_phone_number ? `<p>Phone: ${result.formatted_phone_number}</p>` : ''}
            </div>
          `
        });
        infowindow.open(map, marker);
      }
    });
  }

  // Dynamically add Google Maps API
  function loadGoogleMapsScript() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&callback=initMap`;
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
  :global(.info-window) {
    font-family: Arial, sans-serif;
    font-size: 14px;
    max-width: 300px;
  }
  :global(.info-window h3) {
    margin: 0 0 10px 0;
    font-size: 16px;
  }
  :global(.info-window p) {
    margin: 5px 0;
  }
</style>

<div id="map" bind:this={mapElement}></div>
