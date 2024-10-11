import { json } from '@sveltejs/kit';

export async function GET({ url, fetch, env }) {
  const endpoint = url.searchParams.get('endpoint');
  const params = Object.fromEntries(url.searchParams.entries());
  delete params.endpoint;

  // Add the API key to the params
  params.key = env.GOOGLE_MAPS_API_KEY;
  console.log(`params.key = ${params.key}`);

  const apiUrl = new URL(`https://maps.googleapis.com/maps/api/${endpoint}`);
  Object.keys(params).forEach(key => apiUrl.searchParams.append(key, params[key]));

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error('Google Maps API Error:', error);
    return json({ error: 'Failed to fetch data from Google Maps API' }, { status: 500 });
  }
}
