import { computed } from 'nanostores'
import { $agents, $selectedAgentId } from './agents'

export const $currentAgent = computed([$agents, $selectedAgentId], (agents, id) =>
  agents.find((e) => e.id === id),
)

export const setSelectedAgent = (id) => {
  const current = $selectedAgentId.get()
  const deselect = current === id
  deselect ? $selectedAgentId.set('') : $selectedAgentId.set(id)
}

export const updateCurrentAgent = (dataForm) => {
  const agent = $currentAgent.get()
  $currentAgent.set({
    ...agent,
    ...dataForm,
  })
}
