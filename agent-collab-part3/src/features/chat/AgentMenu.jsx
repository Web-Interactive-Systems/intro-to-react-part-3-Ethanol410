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
