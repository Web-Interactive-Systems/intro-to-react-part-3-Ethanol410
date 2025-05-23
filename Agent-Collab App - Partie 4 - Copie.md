---
type: NoteCard
createdAt: 2025-05-23T12:19:02.320Z
viewedAt: 2025-05-23T12:34:40.758Z
---

# Agent-Collab App - Partie 4
L’objectif de cette partie est d’intégrer le Client OpenAI et d’arriver à communiquer avec un modèle de langue. Nous allons utiliser le modèle de langue d’OpenAI ; toutefois, il est également possible d’utiliser d’autres modèles qui supportent le Client OpenAI.

## Variables d’environnement

Ajouter un fichier .env à la racine du projet. Un fichier .env nous permet de déclarer des variables que nous utilisons dans le code sans les mettre en dur. Souvent, nous y plaçons des variables globales de configuration ou des variables sensibles. En général, le fichier .env n’est pas suivi et donc n’est pas commis sur un serveur Git ou autre.

```js
# fichier .env

VITE_OPENAI_API_KEY=
```

## Client OpenAI

Créer un fichier openai.js, ceci expose un client OpenAI avec {openai, cfg}.

dangerouslyAllowBrowser, c’est pour utiliser OpenAI côté client (utilisation non sécurisée).

```js
import OpenAI from 'openai'

export async function getAIClient({
  baseURL = '',
  apiKey = import.meta.env.VITE_OPENAI_API_KEY,
  model = 'gpt-4o-mini',
  role = 'Your are a wonderful assistant',
  temperature = 0.7,
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
```

## Action onAgent

Dans le fichier actions/agent.js, ajouter une nouvelle action onAgent. Cette action retourn un stream (<https://developer.mozilla.org/en-US/docs/Web/API/Streams_API>)

````js

export const onAgent = async function ({ agent = {}, prompt, canStream = true }) {
  const aiClient = await getAIClient()

  if (isEmpty(agent)) {
    agent = aiClient.cfg
  }

  console.log('onAgent agent', agent)
  console.log('onAgent prompt', prompt)

  agent.role = `${agent.role}
                Respond in the same language of the user.
                Be to the point, and do not add any fluff.`

  if (agent.output) {
    agent.role += `<role>**Your utltimate and most effective role is: ${agent.output} nothing less, nothing more**</role>.`
  }

  if (agent.outputFormat === 'json') {
    agent.role += 'n Ouput: json n  ```json ... ```'
  }

  try {
    const stream = await aiClient.openai.chat.completions.create({
      model: agent.model || aiClient.cfg.model,
      stream: canStream,
      messages: [
        {
          role: 'system',
          content: agent.role,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
      temperature: agent.temperature || 0.7,
    })

    return stream
  } catch (error) {
    console.error('Sorry something went wrong. IA', error.message)
  }

  return []
}
````

## Intégration d’IA dans ChatPrompt

```js
// ChatPrompt.jsx

 const stream = await onAgent({ prompt: prompt })
    for await (const part of stream) {
      const token = part.choices[0]?.delta?.content || ''

      last.content = last.content + token
      cloned[cloned.length - 1] = {
        ...last,
      }

      updateMessages([...cloned])
    }
```

