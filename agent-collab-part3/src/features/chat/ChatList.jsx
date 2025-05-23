import { Markdown } from '@/components/Markdown'
import { $messages } from '@/store/store'
import { useStore } from '@nanostores/react'
import { FaceIcon, PersonIcon } from '@radix-ui/react-icons'
import { Box, Flex } from '@radix-ui/themes'

function ChatList() {
  const messages = useStore($messages)

  return (
    <Flex
      direction='column'
      gap='2'>
      {messages.map((msg) => (
        <Flex key={`message-${msg.id}`}>
          {msg.role === 'assistant' ? (
            <Flex
              style={{
                background: 'var(--accent-5)',
                padding: '4px 8px',
                borderRadius: 18,
                marginLeft: 18,
              }}>
              <Box>
                <PersonIcon />
              </Box>

              <Markdown content={msg.content || ''} />
            </Flex>
          ) : (
            <Flex
              style={{
                background: 'var(--accent-a3)',
                padding: '4px 8px',
                borderRadius: 18,
              }}>
              <Box>
                <FaceIcon />
              </Box>
              <Markdown content={msg.content || ''} />
            </Flex>
          )}
        </Flex>
      ))}
    </Flex>
  )
}

export default ChatList
