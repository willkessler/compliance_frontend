<script>
  import { onMount } from "svelte";
  export let zipcode = "10001";
  let map;
  let mapElement;
  let markers = [];
  let errorMessage = '';
  let apiKey = ''; // We'll fetch this from the server

  async function fetchApiKey() {
    try {
      const response = await fetch('/api/maps-key');
      const data = await response.json();
      return data.apiKey;
    } catch (error) {
      console.error('Failed to fetch API key:', error);
      errorMessage = 'Failed to load map configuration';
    }
  }

  async function loadGoogleMapsScript(apiKey) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onerror = reject;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }

  async function initMap() {
    try {
      const { Map } = await google.maps.importLibrary("maps");
      const { Marker } = await google.maps.importLibrary("marker");
    
      const geocoder = new google.maps.Geocoder();
      const service = new google.maps.places.PlacesService(document.createElement('div'));

      // Geocode the zipcode
      const geocodeResult = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: zipcode }, (results, status) => {
          if (status === "OK") {
            resolve(results[0].geometry.location);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });

      map = new Map(mapElement, {
        zoom: 11,
        center: geocodeResult,
        mapId: "DEMO_MAP_ID", // Replace with your mapId
      });

      // Search for municipal courts
      const placesResult = await new Promise((resolve, reject) => {
        service.textSearch({
          query: 'municipal court',
          location: geocodeResult,
          radius: 32187
        }, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
          } else {
            reject(new Error(`Places search failed: ${status}`));
          }
        });
      });

      placesResult.forEach(place => createMarker(place, Marker));

    } catch (error) {
      console.error('Error initializing map:', error);
      errorMessage = `Failed to initialize map: ${error.message}`;
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

    marker.addListener("click", () => {
      const service = new google.maps.places.PlacesService(map);
      service.getDetails({
        placeId: place.place_id,
        fields: ['name', 'formatted_address', 'website', 'formatted_phone_number']
      }, (placeResult, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const infowindow = new google.maps.InfoWindow({
            content: `
              <div class="info-window">
                <h3>${placeResult.name}</h3>
                <p>${placeResult.formatted_address}</p>
                ${placeResult.website ? `<p>Website: <a href="${placeResult.website}" target="_blank">${placeResult.website}</a></p>` : ''}
                ${placeResult.formatted_phone_number ? `<p>Phone: ${placeResult.formatted_phone_number}</p>` : ''}
              </div>
            `
          });
          infowindow.open(map, marker);
        }
      });
    });
  }

  onMount(async () => {
    try {
      apiKey = await fetchApiKey();
      window.initMap = initMap;
      await loadGoogleMapsScript(apiKey);
    } catch (error) {
      console.error('Failed to load Google Maps:', error);
      errorMessage = 'Failed to load Google Maps';
    }
  });
</script>

<style>
  #map {
    height: 800px;
    width: 100%;
    border: 2px solid black;
  }
  .error {
    color: red;
    padding: 10px;
    border: 1px solid red;
    margin-top: 10px;
  }
</style>

<div id="map" bind:this={mapElement}></div>
{#if errorMessage}
  <div class="error">{errorMessage}</div>
{/if}
