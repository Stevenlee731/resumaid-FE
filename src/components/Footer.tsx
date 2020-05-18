import * as React from 'react'
import StyledFooter from '../styles/StyledFooter'
import Heart from '../styles/Heart'

export interface FooterProps {
  isDark: boolean
}

export default function Footer(props: FooterProps) {
  return (
    <StyledFooter>
      <div>
        <span>Made with </span>
        <Heart>&hearts;</Heart>
        <span> in Los Angeles</span>
      </div>
    </StyledFooter>
  )
}
