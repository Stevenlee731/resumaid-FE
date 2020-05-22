import React from 'react'
import StyledTemplate from '../styles/StyledTemplate'

const Template: React.FC<{
  children: React.ReactNode
  hasSubheader: boolean
}> = ({children, hasSubheader = false}) => {
  return <StyledTemplate hasSubheader={hasSubheader}>{children}</StyledTemplate>
}

export default Template
