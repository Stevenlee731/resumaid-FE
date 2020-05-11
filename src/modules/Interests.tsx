import * as React from 'react'
import {InterestsProps, InterestsModuleProps} from '../types'
import StyledInterests from '../styles/StyledInterests'
import {StyledSectionHeader} from '../styles/Section'

const Interests: React.FC<InterestsModuleProps> = (props): JSX.Element => {
  const {data, background, layout} = props
  return (
    <StyledInterests layout={layout} background={background}>
      <StyledSectionHeader>Interests</StyledSectionHeader>
      <div className="inner">
        {data.map(interest => {
          return <div>{interest.name}</div>
        })}
      </div>
    </StyledInterests>
  )
}

export default Interests
