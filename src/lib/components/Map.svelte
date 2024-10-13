<script>
  import { onMount, afterUpdate } from "svelte";
  export let zipcode = "10001";
  export let preOpenLocation = ""; // New prop for the location to pre-open
  let map;
  let mapElement;
  let markers = [];
  let errorMessage = '';
  let apiKey = ''; // We'll fetch this from the server
  let currentInfoWindow = null; // To keep track of the currently open info window

  function updateMapSize() {
    if (mapElement && map) {
      google.maps.event.trigger(map, 'resize');
    }
  }

  afterUpdate(updateMapSize);

  async function fetchApiKey() {
    try {
      const response = await fetch('/api/maps-key');
      const data = await response.json();
      return data.apiKey;
    } catch (error) {
      console.error('Failed to fetch API key:', error);
      errorMessage = 'Failed to load map configuration';
      throw error;
    }
  }

  async function loadGoogleMapsScript(apiKey) {
    const loader = (g => {
      var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", 
          q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); 
      var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => {
        await (a = m.createElement("script")); e.set("libraries", [...r] + "");
        for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
        e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f; a.onerror = () => h = n(Error(p + " could not load."));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
      d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
      return d;
    })({ key: apiKey, v: "weekly" });

    await loader.importLibrary("maps");
    await loader.importLibrary("places");
    await loader.importLibrary("marker");
  }

 async function initMap() {
   try {
     const { Map } = await google.maps.importLibrary("maps");
     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
     
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

     placesResult.forEach(place => createMarker(place, AdvancedMarkerElement));

     // If a preOpenLocation is provided, find and open the corresponding marker
     if (preOpenLocation) {
       const matchingPlace = placesResult.find(place => 
         place.name.toLowerCase().includes(preOpenLocation.toLowerCase())
       );
       if (matchingPlace) {
         openInfoWindow(matchingPlace);
       }
     }

     updateMapSize();

   } catch (error) {
     console.error('Error initializing map:', error);
     errorMessage = `Failed to initialize map: ${error.message}`;
   }
 }

 function createMarker(place, AdvancedMarkerElement) {
   if (!place.geometry || !place.geometry.location) return;

   const marker = new AdvancedMarkerElement({
     map,
     position: place.geometry.location,
     title: place.name,
     content: new google.maps.marker.PinElement({
       glyph: place.name[0],
       glyphColor: "#ffffff",
       background: "#1a73e8",
       borderColor: "#ffffff",
     }).element,
   });

   markers.push(marker);

   marker.addListener("click", () => openInfoWindow(place));
 }

 function openInfoWindow(place) {
   // Close the currently open info window if there is one
   if (currentInfoWindow) {
     currentInfoWindow.close();
   }

   const service = new google.maps.places.PlacesService(map);
   service.getDetails({
     placeId: place.place_id,
     fields: ['name', 'formatted_address', 'website', 'formatted_phone_number']
   }, (placeResult, status) => {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
       const infowindow = new google.maps.InfoWindow({
         content: `
            <div class="info-window" style="font-family: Arial, sans-serif; padding: 10px;">
              <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">${placeResult.name}</h3>
              <p style="font-size: 14px; margin-bottom: 5px;">${placeResult.formatted_address}</p>
              ${placeResult.website ? `<p style="font-size: 14px; margin-bottom: 5px;">Website: <a href="${placeResult.website}" target="_blank" style="color: #0000FF; text-decoration: underline;">${placeResult.website}</a></p>` : ''}
              ${placeResult.formatted_phone_number ? `<p style="font-size: 14px; margin-bottom: 5px;">Phone: ${placeResult.formatted_phone_number}</p>` : ''}
            </div>
         `
       });
       infowindow.open(map, markers.find(m => m.title === place.name));
       currentInfoWindow = infowindow; // Update the reference to the currently open info window
     }
   });
 }

  onMount(async () => {
    try {
      apiKey = await fetchApiKey();
      await loadGoogleMapsScript(apiKey);
      await initMap();
      window.addEventListener('resize', updateMapSize);
    } catch (error) {
      console.error('Failed to load Google Maps:', error);
      errorMessage = 'Failed to load Google Maps';
    }

    return () => {
      window.removeEventListener('resize', updateMapSize);
    };
  });
</script>

<style>
  .map-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  #map {
    flex-grow: 1;
    border: 2px solid black;
  }
  .error {
    color: red;
    padding: 10px;
    border: 1px solid red;
    margin-top: 10px;
  }
</style>

<div class="map-container">
  <div id="map" bind:this={mapElement}></div>
  {#if errorMessage}
    <div class="error">{errorMessage}</div>
  {/if}
</div>
