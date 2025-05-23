import {
  $agents,
  $selectedAgentId,
  addAgent,
  removeAgent,
  setSelectedAgent,
} from '@/store/store'
import { useStore } from '@nanostores/react'
import { Pencil1Icon, Pencil2Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Box, Button, Card, Flex, Text } from '@radix-ui/themes'

function AgentList() {
  const agents = useStore($agents)
  const selectedAgent = useStore($selectedAgentId)

  return (
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
      <Card
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          type='submit'
          onClick={() => addAgent()}>
          <PlusIcon />
          Ajouter
        </Button>
      </Card>
      {agents.map((agent) => (
        <Card
          style={{
            background: selectedAgent === agent.id ? 'var(--focus-7)' : '',
            width: '100%',
            height: '100%',
          }}>
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
          <Flex
            justify='end'
            gap='4'>
            <Button
              variant='ghost'
              onClick={() => setSelectedAgent(agent.id)}>
              {selectedAgent === agent.id ? <Pencil2Icon /> : <Pencil1Icon />}
            </Button>
            <Button
              variant='ghost'
              color='red'
              onClick={() => removeAgent(agent.id)}>
              <TrashIcon />
            </Button>
          </Flex>
        </Card>
      ))}
    </Box>
  )
}

export default AgentList
