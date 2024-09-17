export async function handle({ event, resolve }) {
  event.env = {
    CHATGPT_API_KEY: process.env.CHATGPT_API_KEY,
    CUSTOM_GPT_ID: process.env.CUSTOM_GPT_ID
  };
  return resolve(event);
}
