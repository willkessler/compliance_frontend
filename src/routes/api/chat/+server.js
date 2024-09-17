import { json } from '@sveltejs/kit';
import OpenAI from 'openai';

export async function POST({ request, env }) {
  const openai = new OpenAI({
    apiKey: env.CHATGPT_API_KEY
  });

  try {
    const { messages } = await request.json();

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
    });

    return json(chatCompletion);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return json({
      error: 'Failed to fetch response from ChatGPT',
      details: error.message
    }, { status: 500 });
  }
}
