import EmojiPicker from '@/components/EmojiPicker'
import { $currentAgent, addAgent, updateCurrentAgent } from '@/store/store'
import { useStore } from '@nanostores/react'
import { CheckIcon } from '@radix-ui/react-icons'
import { Button, Flex, Select, Slider, Text, TextArea, TextField } from '@radix-ui/themes'

const AgentForm = () => {
  const currentAgent = useStore($currentAgent) || {}

  const onChange = (key, value) => {
    updateCurrentAgent({ [key]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', currentAgent)
    addAgent(currentAgent)
  }

  console.log('currentAgent', currentAgent)

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        width: 450,
      }}
      onSubmit={onSubmit}>
      {/* Emoji Picker */}
      <Flex
        direction='column'
        gap='1'>
        <label>Emoji</label>
        <EmojiPicker
          defaultValue={currentAgent.emoji || '🤠'}
          onChange={(emoji) => onChange('emoji', emoji)}
        />
      </Flex>

      {/* Text Fields */}
      {['title', 'role'].map((key) => (
        <Flex
          direction='column'
          key={key}
          gap='1'>
          <label
            htmlFor={key}
            style={{ textTransform: 'capitalize' }}>
            {key.replace('_', ' ')}
          </label>
          <TextField.Root
            placeholder={`Agent ${key.replace('_', ' ')}`}
            value={currentAgent[key] || ''}
            onChange={(e) => onChange(key, e.target.value)}
          />
        </Flex>
      ))}

      {/* Options Field */}
      <Flex
        direction='column'
        gap='1'>
        <label htmlFor={'response_format'}>Response Format</label>
        <Select.Root defaultValue={currentAgent.response_format || 'text'}>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value='text'>Text</Select.Item>
            <Select.Item value='json'>JSON</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>

      {/* Textarea Field */}
      <Flex
        direction='column'
        gap='1'>
        <label htmlFor={'desired_response'}>Desired Response</label>
        <TextArea
          placeholder='Desired response…'
          value={currentAgent.desired_response || ''}
          onChange={(e) => onChange('desired_response', e.target.value)}
          resize='vertical'
        />
      </Flex>

      {/* Slide Field */}
      <Flex
        direction='column'
        gap='1'>
        <label>Temperature</label>

        <Flex
          align='center'
          gap='2'>
          <Slider
            defaultValue={[0.7 * 100]}
            value={[currentAgent.temperature * 100]}
            max={100}
            step={1}
            onValueChange={(val) => onChange('temperature', val[0] / 100)}
          />
          <Text size='1'>{currentAgent.temperature?.toFixed(2) || 0.7}</Text>
        </Flex>
      </Flex>

      {/* Submit action, see onSubmit in the <form> tag above */}
      <Flex justify='end'>
        <Button type='submit'>
          <CheckIcon />
          Sauver
        </Button>
      </Flex>
    </form>
  )
}

export default AgentForm
