import * as React from 'react'
import {SidebarSectionProps} from '../types'
import {StyledSidebarSection} from '../styles/Section'

export default function SidebarSection({
  children,
  module,
}: SidebarSectionProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClose = (e: React.MouseEvent): void => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  if (module === 'basics') {
    return <StyledSidebarSection>{children}</StyledSidebarSection>
  }

  return (
    <StyledSidebarSection>
      <div className="header">
        <h3>{module}</h3>
        <button onClick={(e): void => handleClose(e)}>x</button>
      </div>

      {isOpen ? children : null}
    </StyledSidebarSection>
  )
}
