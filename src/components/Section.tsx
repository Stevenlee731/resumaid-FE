import React from 'react'
import StyledSection from '../styles/StyledSection'
import {SectionProps} from '../types'

const Section: React.FC<SectionProps> = ({children}) => {
  return <StyledSection>{children}</StyledSection>
}

export default Section
