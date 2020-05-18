/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import {AwardsModuleProps} from '../types'
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
  const {content, slot, background} = props
  return (
    <StyledAwards slot={slot} background={background}>
      <StyledSectionHeader slot={slot}>Awards</StyledSectionHeader>
      <div className="inner">
        {content &&
          content.map(content => {
            return (
              <Award
                key={content.title}
                awarder={content.awarder}
                title={content.title}
              />
            )
          })}
      </div>
    </StyledAwards>
  )
}

export default Awards
