// function générateur : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
export const onDummyAgent = async function* () {
  const mockResponses = [
    'Bonne question ! Voici une explication rapide...',
    'Bien sûr ! Explorons cela ensemble.',
    'Voici ce que je peux te dire à ce sujet :',
    'Intéressant ! Voici une réponse possible :',
    "D'accord ! Voici une réponse simulée basée sur ta demande.",
  ]

  // Simuler a retard avant le premier token
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500))

  // Sélectionner une réponse random
  const response = mockResponses[Math.floor(Math.random() * mockResponses.length)]

  // Stream la réponse caractères par caractères avec un petit retard
  for (let i = 0; i < response.length; i++) {
    yield response[i]
    await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 50)) // simulate typing
  }
}
