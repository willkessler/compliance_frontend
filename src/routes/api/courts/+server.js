import { json } from '@sveltejs/kit';
import https from 'https';

export async function POST({ request, env }) {
  const { action, zipcode, lat, lng, placeId } = await request.json();

  const baseUrl = 'https://maps.googleapis.com/maps/api';
  const apiKey = env.GOOGLE_MAPS_API_KEY;

  try {
    let url, data;

    switch (action) {
      case 'geocode':
        url = `${baseUrl}/geocode/json?address=${encodeURIComponent(zipcode)}&key=${apiKey}`;
        data = await fetchFromGoogle(url);
        
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          return json({ success: true, lat, lng });
        } else {
          throw new Error('Geocoding failed');
        }

      case 'search':
        url = `${baseUrl}/place/nearbysearch/json?location=${lat},${lng}&radius=32186&keyword=municipal%20court&key=${apiKey}`;
        data = await fetchFromGoogle(url);
        
        return json({ success: true, results: data.results });

      case 'details':
        url = `${baseUrl}/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,rating&key=${apiKey}`;
        data = await fetchFromGoogle(url);
        
        return json({ success: true, result: data.result });

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Error in court API:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

function fetchFromGoogle(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}
