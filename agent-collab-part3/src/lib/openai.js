import Agent from '@/features/agent/Agent'
import OpenAI from 'openai'

export async function getAIClient({
  baseURL = '',
  apiKey = import.meta.env.VITE_OPENAI_API_KEY,
  model = 'gpt-4o-mini',
  role = Agent.role,
  temperature = Agent.temperature,
} = {}) {
  return {
    openai: new OpenAI({
      baseURL,
      apiKey,
      dangerouslyAllowBrowser: true,
    }),
    cfg: {
      model,
      role,
      temperature,
    },
  }
}
