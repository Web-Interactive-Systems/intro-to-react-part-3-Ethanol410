import { getAIClient } from '@/lib/openai'
import { isEmpty } from 'lodash'

// function générateur : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
// export const onDummyAgent = async function* () {
//   const mockResponses = [
//     'Bonne question ! Voici une explication rapide...',
//     'Bien sûr ! Explorons cela ensemble.',
//     'Voici ce que je peux te dire à ce sujet :',
//     'Intéressant ! Voici une réponse possible :',
//     "D'accord ! Voici une réponse simulée basée sur ta demande.",
//   ]

//   // Simuler a retard avant le premier token
//   await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500))

//   // Sélectionner une réponse random
//   const response = mockResponses[Math.floor(Math.random() * mockResponses.length)]

//   // Stream la réponse caractères par caractères avec un petit retard
//   for (let i = 0; i < response.length; i++) {
//     yield response[i]
//     await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 50)) // simulate typing
//   }
// }

export const onAgent = async function ({ agent = {}, prompt, canStream = true }) {
  const aiClient = await getAIClient()

  // Si aucun agent n'est fourni, utiliser la configuration par défaut
  if (isEmpty(agent)) {
    agent = aiClient.cfg
  }

  console.log('onAgent agent', agent)
  console.log('onAgent role', agent.role)
  console.log('onAgent temparature', agent.temperature)
  console.log('onAgent prompt', prompt)
  // Construire le rôle de l'agent
  let systemRole = agent.role || 'You are a helpful assistant.'

  if (agent.output) {
    systemRole += `\n<role>**Your ultimate and most effective role is: ${agent.output} nothing less, nothing more**</role>.`
  }

  if (agent.response_format === 'json') {
    systemRole += '\nOutput: json\n```json ... ```'
  }

  try {
    const stream = await aiClient.openai.chat.completions.create({
      model: agent.model || aiClient.cfg.model,
      stream: canStream,
      messages: [
        {
          role: 'system',
          content: systemRole,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      // Utiliser la température de l'agent ou la valeur par défaut
      temperature:
        agent.temperature !== undefined
          ? agent.temperature
          : aiClient.cfg.temperature || 0.7,
    })

    return stream
  } catch (error) {
    console.error('Sorry something went wrong. IA', error.message)
  }

  return []
}
