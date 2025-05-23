import * as React from 'react'
import { Resizable as ResizablePrimitive } from 're-resizable'
import { styled } from '@/lib/stitches'

const StyledResizable = styled(ResizablePrimitive, {
  //
})

export const Resizable = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <StyledResizable
      ref={ref}
      {...props}>
      {children}
    </StyledResizable>
  )
})
