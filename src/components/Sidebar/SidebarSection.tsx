/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import {SidebarSectionProps} from '../../types'
import {StyledSidebarSection} from '../../styles/Section'
import StyledButton from '../../styles/StyledButton'
import {Chevron} from '../../assets/svg'

export default function SidebarSection({
  children,
  module,
}: SidebarSectionProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

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
        <StyledButton onClick={(e): void => handleClose(e)}>
          <Chevron direction={isOpen ? 'up' : 'down'} />
        </StyledButton>
      </div>

      {isOpen ? children : null}
    </StyledSidebarSection>
  )
}
