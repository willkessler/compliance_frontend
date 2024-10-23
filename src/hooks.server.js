export async function handle({ event, resolve }) {
  event.env = {
    CHATGPT_API_KEY: process.env.CHATGPT_API_KEY,
    CUSTOM_GPT_ID: process.env.CUSTOM_GPT_ID,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  };
  return resolve(event);
}
