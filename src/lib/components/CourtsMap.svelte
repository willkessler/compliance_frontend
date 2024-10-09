<script>
  import { onMount } from 'svelte';
  
  export let zipcode;

  let mapElement;

  onMount(async () => {
    try {
      // Load the Google Maps JavaScript API without the API key
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?libraries=places&v=weekly";
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);

      // Wait for the script to load
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });

      // Now that the script is loaded, we can initialize the map
      await initMap();
    } catch (error) {
      console.error('Error setting up map:', error);
    }
  });

  async function initMap() {
    try {
      const response = await fetch('/api/courts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zipcode, action: 'geocode' })
      });
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error);
      }

      const position = { lat: data.lat, lng: data.lng };

      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      const map = new Map(mapElement, {
        zoom: 12,
        center: position,
        mapId: "DEMO_MAP_ID",
      });

      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Center",
      });

      // Add event listener for idle event to search for nearby places
      map.addListener('idle', () => {
        const center = map.getCenter();
        searchNearbyPlaces(map, { lat: center.lat(), lng: center.lng() });
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  async function searchNearbyPlaces(map, location) {
    try {
      const response = await fetch('/api/courts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          lat: location.lat(), 
          lng: location.lng(), 
          action: 'search' 
        })
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      data.results.forEach(place => {
        new AdvancedMarkerElement({
          map,
          position: { lat: place.geometry.location.lat, lng: place.geometry.location.lng },
          title: place.name,
        });
      });
    } catch (error) {
      console.error('Error searching nearby places:', error);
    }
  }
</script>

<div bind:this={mapElement} id="map"></div>

<style>
  #map {
    width: 100%;
    height: 400px;
  }
</style>
