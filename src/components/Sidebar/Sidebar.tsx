/* eslint-disable @typescript-eslint/no-unused-vars */
import StyledSidebar from '../../styles/StyledSidebar'

import * as React from 'react'

export interface SidebarProps {
  children: JSX.Element[] | JSX.Element
}

export default function Sidebar({children}: SidebarProps): JSX.Element {
  return <StyledSidebar>{children}</StyledSidebar>
}
