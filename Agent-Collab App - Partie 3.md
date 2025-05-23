---
type: NoteCard
createdAt: 2025-05-12T08:57:24.835Z
viewedAt: 2025-05-23T09:19:24.849Z
---

# Agent-Collab App - Partie 3
L’objectif de cette partie est de produire la vue menu des agents qui est intégrée au ChatPrompt (bouton “+” bleu). Elle se compose de deux sous parties :

1.  Une vue type ‘Dialog’ (voir radix Dialog) permettant de sélectionner ou désélectionner des agents (appelée AgentMenu)
2.  Une liste horizontale permettant de réordonner les agents sélectionner via le la vue dialog et d’enlever, en cas de besoin, les agents de la liste (appelée AgentSelect). Pour réordonner les agnents on utilise un drag-&-drop

Voici à quoi cela ressemble :

![{width=678,height=auto}](attachments/Screenshot-2025-05-16-at-11.57.53-l3ahmwsmfkms5u6c.png)

*   Quand je clique sur le call to action (“+”) dans le ChatPrompt, cela ouvre la vue dialog avec la liste des agents existants dans le store

*   La liste des agents est une liste de cartes

*   La carte de l’agent a un Checkbox (voir Checkbox de Radix) pour sélectionner ou désélectionner un agent

*   Utiliser un fichier `chatAgents.js` pour le store des agents dans ChatPrompt

    *   Stocker seulement les ids des agents sélectionnés : `export const $selectedChatAgents = atom([])`

*   Le composant pour `AgentSelect` est déjà founi



## Solution

AgentMenu.jsx

```js
import { $agents, $selectedChatAgents, selectChatAgent } from '@/store/store'
import { useStore } from '@nanostores/react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Card, Checkbox, Dialog, Flex, Text } from '@radix-ui/themes'

export function AgentMenu() {
  const agents = useStore($agents)
  const selected = useStore($selectedChatAgents)

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <PlusIcon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth='650px'>
        <Dialog.Title>Sélectionner vos agents...</Dialog.Title>
        <Dialog.Description
          size='2'
          mb='4'>
          Ajouter un ou plusieurs agents au chat...
        </Dialog.Description>

        <Box
          width='100%'
          height='100%'
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(182px, 1fr))`,
            alignContent: 'flex-start',
            gap: 10,
            padding: 0,
          }}>
          {agents.map((agent) => (
            <Card
              style={{
                width: '100%',
                height: '100%',
              }}>
              <Flex
                justify='end'
                gap='4'>
                <Checkbox
                  name={agent.id}
                  defaultChecked={selected.includes(agent.id)}
                  onCheckedChange={(checked) => selectChatAgent(checked, agent.id)}
                />
              </Flex>
              <Flex
                gap='3'
                align='center'>
                {agent.emoji}
                <Box>
                  <Text
                    as='div'
                    size='2'
                    weight='bold'>
                    {agent.title}
                  </Text>
                  <Box
                    width='142px'
                    minHeight='40px'>
                    <Text
                      as='div'
                      size='2'
                      color='gray'
                      wrap='wrap'>
                      {agent.desired_response}
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Card>
          ))}
        </Box>

        <Flex
          gap='3'
          mt='4'
          justify='end'>
          <Dialog.Close>
            <Button
              variant='soft'
              color='gray'>
              Fermer
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Sauver</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
```

AgentSelect.jsx

```js
const agents = useStore($agents)
const selected = useStore($selectedChatAgents)

// ...

const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = selected.indexOf(active.id)
      const newIndex = selected.indexOf(over.id)
      const newSelected = arrayMove(selected, oldIndex, newIndex)
      setSelectChatAgents(newSelected)
      $selectedChatAgents.set(newSelected)
    }
  }

  const handleRemove = (idToRemove) => {
    const newSelected = selected.filter((id) => id !== idToRemove)
    console.log('handleRemove', idToRemove, newSelected)
    setSelectChatAgents(newSelected)
  }
```

chatAgents.js

```js
import { atom } from 'nanostores'

export const $selectedChatAgents = atom([])

export const selectChatAgent = (checked, id) => {
  const selected = $selectedChatAgents.get()
  if (checked) {
    $selectedChatAgents.set([...selected, id])
  } else {
    $selectedChatAgents.set(selected.filter((e) => e !== id))
  }
}

export const setSelectChatAgents = (ids) => {
  $selectedChatAgents.set(ids)
}
```

store.js

```js
// ....
export * from './chatAgents'
```







