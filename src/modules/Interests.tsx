import * as React from 'react'
import {InterestsProps, InterestsModuleProps} from '../types'
import StyledInterests from '../styles/StyledInterests'
import {StyledSectionHeader} from '../styles/Section'

const Interests: React.FC<InterestsModuleProps> = (props): JSX.Element => {
  const {content, background, slot} = props
  return (
    <StyledInterests slot={slot} background={background}>
      <StyledSectionHeader slot={slot}>Interests</StyledSectionHeader>
      <div className="inner">
        {content.map(interest => {
          return <div key={interest.name}>{interest.name}</div>
        })}
      </div>
    </StyledInterests>
  )
}

export default Interests
