import * as React from 'react'
import {InterestsProps, InterestsModuleProps} from '../types'
import StyledInterests from '../styles/StyledInterests'

const Interests: React.FC<InterestsModuleProps> = (props): JSX.Element => {
  const {data, background, layout} = props
  return (
    <StyledInterests layout={layout} background={background}>
      <h3>Interests</h3>
    </StyledInterests>
  )
}

export default Interests
