<script>
  import { onMount } from 'svelte';
  
  export let zipcode;

  let mapElement;
  let map;
  let markers = [];
  let infoWindow;

  onMount(() => {
    loadGoogleMapsScript();
  });

  function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }

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

      const location = { lat: data.lat, lng: data.lng };
      map = new google.maps.Map(mapElement, {
        center: location,
        zoom: 12
      });

      infoWindow = new google.maps.InfoWindow();
      
      searchNearbyPlaces(location);

      map.addListener('idle', () => {
        const center = map.getCenter();
        searchNearbyPlaces({ lat: center.lat(), lng: center.lng() });
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  async function searchNearbyPlaces(location) {
    clearMarkers();

    try {
      const response = await fetch('/api/courts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          lat: location.lat, 
          lng: location.lng, 
          action: 'search' 
        })
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      data.results.forEach(createMarker);
    } catch (error) {
      console.error('Error searching nearby places:', error);
    }
  }

  function createMarker(place) {
    const marker = new google.maps.Marker({
      map: map,
      position: { lat: place.geometry.location.lat, lng: place.geometry.location.lng },
      title: place.name
    });

    marker.addListener('click', () => {
      const content = `
        <div>
          <h3>${place.name}</h3>
          <p>${place.vicinity}</p>
          ${place.rating ? `<p>Rating: ${place.rating} / 5</p>` : ''}
        </div>
      `;
      infoWindow.setContent(content);
      infoWindow.open(map, marker);

      fetchPlaceDetails(place.place_id);
    });

    markers.push(marker);
  }

  async function fetchPlaceDetails(placeId) {
    try {
      const response = await fetch('/api/courts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId, action: 'details' })
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      const placeDetails = data.result;
      const updatedContent = `
        <div>
          <h3>${placeDetails.name}</h3>
          <p>${placeDetails.formatted_address}</p>
          ${placeDetails.formatted_phone_number ? `<p>Phone: ${placeDetails.formatted_phone_number}</p>` : ''}
          ${placeDetails.website ? `<p><a href="${placeDetails.website}" target="_blank">Website</a></p>` : ''}
          ${placeDetails.rating ? `<p>Rating: ${placeDetails.rating} / 5</p>` : ''}
        </div>
      `;
      infoWindow.setContent(updatedContent);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  }

  function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
  }
</script>

<div bind:this={mapElement} style="width: 100%; height: 400px;"></div>

<style>
  /* Add any additional styles here */
</style>
