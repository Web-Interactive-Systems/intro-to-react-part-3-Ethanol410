import { atom } from 'nanostores'

export const $selectedChatAgents = atom([])

export const selectChatAgent = (checked, id) => {
  const selected = $selectedChatAgents.get()
  if (checked) {
    $selectedChatAgents.set([...selected, id])
  } else {
    $selectedChatAgents.set(selected.filter((e) => e !== id))
  }
}

export const setSelectChatAgents = (ids) => {
  $selectedChatAgents.set(ids)
}
