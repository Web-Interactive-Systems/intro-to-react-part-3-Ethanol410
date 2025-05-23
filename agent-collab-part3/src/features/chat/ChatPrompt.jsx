// import { onAgent, onDummyAgent } from '@/actions/agent'
import { styled } from '@/lib/stitches'
import { $messages, addMessage, updateMessages, $agents } from '@/store/store'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { Button, Flex, TextArea } from '@radix-ui/themes'
import { useRef, useState } from 'react'
import { useStore } from '@nanostores/react'
import { AgentMenu } from './AgentMenu'
import { $selectedChatAgents } from '@/store/chatAgents'
import { AgentSelect } from './AgentSelect'
import { last } from 'lodash'
import { onAgent } from '@/actions/agent'

const PromptContainer = styled(Flex, {
  width: '100%',
  padding: '12px 18px',
  borderRadius: '18px',
  background: 'var(--accent-2)',
})

const PromptArea = styled(TextArea, {
  width: '100%',
  boxShadow: 'none',
  outline: 'none',
  background: 'none',
  '& textarea': {
    fontSize: '1.1rem',
    fontWeight: 450,
  },
})

function ChatPrompt() {
  const promptRef = useRef(null)
  const [isEmpty, setIsEmpty] = useState(true)
  const agents = useStore($agents)
  const selectedAgentIds = useStore($selectedChatAgents)

  // Récupérer le premier agent sélectionné
  const getSelectedAgent = () => {
    console.log('getSelectedAgent', selectedAgentIds)
    if (selectedAgentIds.length === 0) return null
    return agents.find((agent) => agent.id === selectedAgentIds[0])
  }

  const onTextChange = () => {
    const val = promptRef.current.value || ''
    setIsEmpty(val.trim().length === 0)
  }
  const onSendPrompt = async () => {
    const prompt = promptRef.current.value || ''
    console.log('onSendPrompt', promptRef.current.value)

    addMessage({
      role: 'user',
      content: promptRef.current.value,
      id: Math.random().toString(),
    })

    // AI response
    const response = {
      role: 'assistant',
      content: '',
      id: Math.random().toString(),
      completed: false,
    }

    // add AI response to chat messages
    addMessage(response)

    const cloned = $messages.get()
    const last = cloned.at(-1)

    // Récupérer tous les agents sélectionnés
    const selectedAgents = selectedAgentIds
      .map((id) => agents.find((agent) => agent.id === id))
      .filter(Boolean)

    console.log('Selected agents:', selectedAgents)

    // Message initial
    let currentPrompt = prompt

    // Traiter le message avec chaque agent séquentiellement
    for (const agent of selectedAgents) {
      console.log('Processing with agent:', agent.title)

      const stream = await onAgent({
        agent: agent,
        prompt: currentPrompt,
      })

      let fullResponse = ''
      for await (const part of stream) {
        const token = part.choices[0]?.delta?.content || ''
        fullResponse += token

        last.content = fullResponse
        cloned[cloned.length - 1] = {
          ...last,
        }

        updateMessages([...cloned])
      }

      // Utiliser la réponse de cet agent comme entrée pour le prochain agent
      currentPrompt = fullResponse
    }

    // Réinitialiser le champ de texte après l'envoi
    promptRef.current.value = ''
    setIsEmpty(true)
  }

  return (
    <Flex
      justify='center'
      mt='auto'
      width='100%'>
      <PromptContainer
        align='center'
        direction='column'>
        <PromptArea
          ref={promptRef}
          id='Todo'
          placeholder='Comment puis-je aider...'
          onChange={onTextChange}
          onKeyDown={(e) => {
            const canSend = !isEmpty && e.key === 'Enter'
            const mod = e.metaKey || e.ctrlKey || e.altKey || e.shiftKey
            if (canSend && !mod) {
              // Prevent default behavior of Enter key
              e.preventDefault()
              onSendPrompt()
            }
          }}
        />

        <Flex
          justify='start'
          align='center'
          width='100%'>
          <AgentMenu />
          <AgentSelect />
        </Flex>
        <Flex
          justify='end'
          width='100%'>
          <Button
            disabled={isEmpty}
            onClick={onSendPrompt}>
            <PaperPlaneIcon />
          </Button>
        </Flex>
      </PromptContainer>
    </Flex>
  )
}

export default ChatPrompt
