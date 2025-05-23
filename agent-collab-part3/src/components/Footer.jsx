import { Text, Flex, Separator } from '@radix-ui/themes'
import { Link } from 'raviger'

export function Footer() {
  return (
    <Flex
      style={{ height: 18 }}
      direction='column'
      justify='center'
      align='center'>
      <Separator
        size='1'
        orientation='horizontal'
        style={{
          width: '90%',
        }}
      />
      <Flex
        justify='center'
        width='100%'
        align='center'
        gap='3'
        px='3'
        py='3'>
        <Text size='1'>AgentCollab</Text>
      </Flex>
    </Flex>
  )
}
