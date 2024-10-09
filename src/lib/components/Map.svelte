<script>
  import { onMount } from "svelte";
  export let zipcode = "10001"; // Default zip code, but now we can pass it in as a prop
  let map;
  let mapElement;
  let markers = [];

  // Geocode and center the map based on the provided zip code, then search for municipal courts
  window.initMap = async function() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    // Get LatLng for the zip code
    geocoder.geocode({ address: zipcode }, (results, status) => {
      if (status === "OK") {
        const centerPosition = results[0].geometry.location;

        map = new Map(mapElement, {
          zoom: 11,
          center: centerPosition,
          mapId: "DEMO_MAP_ID", // Replace with your mapId
        });

        // Search for municipal courts within 20 miles (32187 meters)
        const request = {
          location: centerPosition,
          radius: 32187,
          query: 'municipal court'
        };

        service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
              createAdvancedMarker(results[i], AdvancedMarkerElement);
            }
          }
        });
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  function createAdvancedMarker(place, AdvancedMarkerElement) {
    if (!place.geometry || !place.geometry.location) return;

    const content = document.createElement('div');
    content.classList.add('court-marker');
    content.innerHTML = `
      <h4>${place.name}</h4>
      <p>${place.formatted_address}</p>
    `;

    const marker = new AdvancedMarkerElement({
      map,
      position: place.geometry.location,
      content: content,
      title: place.name,
    });

    markers.push(marker);

    marker.addListener("click", () => {
      service.getDetails({
        placeId: place.place_id,
        fields: ['name', 'website', 'formatted_phone_number']
      }, (placeResult, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const infowindow = new google.maps.InfoWindow({
            content: `
              <strong>${placeResult.name}</strong><br>
              ${place.formatted_address}<br>
              ${placeResult.website ? `Website: <a href="${placeResult.website}" target="_blank">${placeResult.website}</a><br>` : ''}
              ${placeResult.formatted_phone_number ? `Phone: ${placeResult.formatted_phone_number}` : ''}
            `
          });
          infowindow.open(map, marker);
        }
      });
    });
  }

  // Dynamically add Google Maps API
  function loadGoogleMapsScript() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDygv6AHcu52-8mmHRgid42HJFX6Au9Y-E&libraries=places,marker&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
  }

  onMount(() => {
    loadGoogleMapsScript();
  });
</script>

<style>
  #map {
    height: 800px;
    width: 100%;
    border: 2px solid black;
  }
  :global(.court-marker) {
    background-color: #eef;
    border-radius: 8px;
    padding: 8px 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    font-family: Arial, sans-serif;
    font-size: 14px;
    max-width: 200px;
  }
  :global(.court-marker h3) {
    margin: 0 0 4px 0;
    font-size: 16px;
  }
  :global(.court-marker p) {
    margin: 0;
    font-size: 12px;
  }
</style>

<div id="map" bind:this={mapElement}></div>
