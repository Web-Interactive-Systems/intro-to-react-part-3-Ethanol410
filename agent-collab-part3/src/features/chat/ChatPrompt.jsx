import { onDummyAgent } from '@/actions/agent'
import { styled } from '@/lib/stitches'
import { $messages, addMessage, updateMessages } from '@/store/store'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { Button, Flex, TextArea } from '@radix-ui/themes'
import { useRef, useState } from 'react'

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

  const onTextChange = () => {
    const val = promptRef.current.value || ''
    setIsEmpty(val.trim().length === 0)
  }

  const onSendPrompt = async () => {
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
      completed: false, // not complete yet
    }

    // add AI response to chat messages
    addMessage(response)

    const cloned = $messages.get()
    const last = cloned.at(-1)

    console.log('last', last)

    // call agent
    for await (const token of onDummyAgent()) {
      console.log('token', token, last)
      last.content = last.content + token
      cloned[cloned.length - 1] = {
        ...last,
      }

      console.log('cloned', cloned)

      updateMessages([...cloned])
    }

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
          {/* Todo add agent menu here */}
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
