import { Theme as RadixTheme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import './index.css'

export default function Theme({ children }) {
  return (
    <RadixTheme
      appearance='light'
      accentColor='indigo'
      scaling='100%'
      radius='full'>
      {children}
    </RadixTheme>
  )
}
