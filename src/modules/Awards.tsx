import * as React from 'react'
import {AwardsProps, AwardsModuleProps} from '../types'
import StyledAwards from '../styles/StyledAwards'
import {StyledSectionHeader} from '../styles/Section'

const Award = (props: {awarder?: string; title?: string}): JSX.Element => {
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.awarder}</div>
    </div>
  )
}

const Awards: React.FC<AwardsModuleProps> = (props): JSX.Element => {
  const {data, background, layout} = props
  return (
    <StyledAwards layout={layout} background={background}>
      <StyledSectionHeader>Awards</StyledSectionHeader>
      <div className="inner">
        {data &&
          data.map(award => {
            return (
              <Award
                key={award.title}
                awarder={award.awarder}
                title={award.title}
              />
            )
          })}
      </div>
    </StyledAwards>
  )
}

export default Awards
