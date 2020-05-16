import * as React from 'react'
import {StyledSidebarWrapper} from '../../styles/Section'

export interface SidebarWrapperProps {
  children: JSX.Element[] | JSX.Element
}

export default function SidebarWrapper({children}: SidebarWrapperProps) {
  return <StyledSidebarWrapper>{children}</StyledSidebarWrapper>
}
