import { Header } from '@/components/Header'
import { Box, Flex } from '@radix-ui/themes'
import Theme from './Theme'

export default function LayoutTheme({ children }) {
  return (
    <Theme>
      <Flex
        direction='column'
        style={{ minHeight: '100vh' }}>
        <Box>
          <Header />
        </Box>
        <Box
          width='100%'
          style={{ height: 'calc(100vh - 42px)' }}
          flex='1'>
          {children}
        </Box>
        {/* <Box
          mt='auto'>
          <Footer />
        </Box> */}
      </Flex>
    </Theme>
  )
}
