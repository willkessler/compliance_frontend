import { json } from '@sveltejs/kit';

export async function GET({ env }) {
  // You might want to add additional security checks here
  return json({ apiKey: env.GOOGLE_MAPS_API_KEY });
}
