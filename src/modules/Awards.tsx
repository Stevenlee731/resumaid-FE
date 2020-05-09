import * as React from 'react'
import {AwardsProps, AwardsModuleProps} from '../types'
import StyledAwards from '../styles/StyledAwards'

const Awards: React.FC<AwardsModuleProps> = (props): JSX.Element => {
  const {data, background, layout} = props
  return (
    <StyledAwards layout={layout} background={background}>
      <h3>Awards</h3>
      <div>
        {data &&
          data.map(award => {
            return <div key={award.title}>{award.title}</div>
          })}
      </div>
    </StyledAwards>
  )
}

export default Awards
