import { Flex, Separator } from '@radix-ui/themes'
import AgentForm from './AgentForm'
import AgentList from './AgentList'
import { useStore } from '@nanostores/react'
import { $selectedAgentId } from '@/store/store'

function Agent() {
  const selectedAgentId = useStore($selectedAgentId)
  return (
    <Flex
      gap='4'
      p='2'
      width='100%'
      height='100%'>
      <AgentList />

      {selectedAgentId && (
        <>
          <Separator
            orientation='vertical'
            size='4'
            mr='2'
          />
          <AgentForm />
        </>
      )}
    </Flex>
  )
}

export default Agent
