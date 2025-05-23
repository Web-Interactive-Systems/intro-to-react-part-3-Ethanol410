import { SYMBOLS } from '@/utils/emojis'
import { atom } from 'nanostores'

export const $selectedAgentId = atom('')

export const $agents = atom([
  {
    id: Math.random().toString(),
    emoji: '😀',
    title: 'writer azraz azr',
    role: 'your are a wonderful writer',
    response_format: 'text',
    temperature: 0.1,
    desired_response: 'a draft of scifi writing',
  },
  {
    id: Math.random().toString(),
    emoji: '🤠',
    title: 'scientist',
    role: 'your are a wonderful scientist',
    response_format: 'text',
    temperature: 0.7,
    desired_response: 'scientific analysis',
  },
  {
    id: Math.random().toString(),
    emoji: '🤠',
    title: 'scientist',
    role: 'your are a wonderful scientist',
    response_format: 'text',
    temperature: 0.7,
    desired_response: 'scientific analysis',
  },
  {
    id: Math.random().toString(),
    emoji: '🤠',
    title: 'scientist',
    role: 'your are a wonderful scientist',
    response_format: 'text',
    temperature: 0.7,
    desired_response: 'scientific analysis',
  },
  {
    id: Math.random().toString(),
    emoji: '🤠',
    title: 'scientist',
    role: 'your are a wonderful scientist',
    response_format: 'text',
    temperature: 0.7,
    desired_response: 'scientific analysis',
  },
])

export const addAgent = (agent = {}) => {
  const agents = $agents.get()
  // if has id, then update existing,
  // else create new agent
  if (agent?.id) {
    const index = agents.findIndex((e) => e.id === agent.id)
    agents[index] = { ...agents[index], ...agent }
    $agents.set([...agents])
  } else {
    agent.id = Math.random().toString()
    agent.emoji = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    agent.temperature = 0.7
    $agents.set([agent, ...agents])
  }

  // set current as selected
  $selectedAgentId.set(agent.id)
}

export const removeAgent = (id) => {
  const agents = $agents.get()
  $agents.set(agents.filter((e) => e.id !== id))
}
