import React from 'react'
import styled from 'styled-components'
import StyledPage from '../styles/StyledPage'

const Page: React.FC<{children: React.ReactNode; hasSidebar: boolean}> = ({
  children,
  hasSidebar,
}) => {
  return <StyledPage hasSidebar={hasSidebar}>{children}</StyledPage>
}

export default Page
