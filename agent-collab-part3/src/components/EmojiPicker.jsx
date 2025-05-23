import { Box, Button, Flex, Popover, Tabs, Text } from '@radix-ui/themes'
import { ACTIVITIES, EXPRESSIONES, FOOD, GESTURES, PLACES, SYMBOLS } from '@/utils/emojis'
import { styled } from '@/lib/stitches'

const EmojisList = [
  {
    title: 'Emotion',
    data: EXPRESSIONES,
  },
  {
    title: 'Gesture',
    data: GESTURES,
  },
  {
    title: 'Place',
    data: PLACES,
  },
  {
    title: 'Food',
    data: FOOD,
  },
  {
    title: 'Activity',
    data: ACTIVITIES,
  },
  {
    title: 'Symbol',
    data: SYMBOLS,
  },
]

const EmojiBox = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  cursor: 'pointer',
  borderRadius: '100%',
  '&:hover': {
    background: 'var(--focus-6)',
  },
})

export const EmojiTabs = ({ onChange }) => {
  const selectEmoji = (emoji) => onChange?.(emoji)

  return (
    <Flex>
      <Tabs.Root defaultValue='Emotion'>
        <Tabs.List>
          {EmojisList.map((emoji) => (
            <Tabs.Trigger value={emoji.title}>
              <Text size='1'>{emoji.title}</Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Box pt='3'>
          {EmojisList.map((emoji) => (
            <Tabs.Content value={emoji.title}>
              <Flex
                key={emoji.title}
                style={{
                  display: 'grid',
                  overflowY: 'auto',
                  height: 300,
                  gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
                  transition: 'opacity 0.2s',
                  alignItems: 'flex-start',
                  gap: '$025',
                }}>
                {(emoji.data || []).map((ex) => (
                  <EmojiBox
                    key={ex}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      selectEmoji(ex)
                    }}>
                    {ex}
                  </EmojiBox>
                ))}
              </Flex>
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </Flex>
  )
}

export default function EmojiPicker({ value, defaultValue = '🤖', ...props }) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant='ghost'>{value || defaultValue}</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Flex gap='3'>
          <EmojiTabs {...props} />
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
