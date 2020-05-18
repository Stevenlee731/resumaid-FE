import React from 'react'
import StyledPage from '../styles/StyledPage'

const Page: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <StyledPage>{children}</StyledPage>
}

export default Page
