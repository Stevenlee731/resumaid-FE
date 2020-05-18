import * as React from 'react'
import {BaseModuleProps, WorkProps, WorkModuleProps} from '../types'
import StyledWork from '../styles/StyledWork'
import {StyledSectionHeader} from '../styles/Section'

const WorkModule: React.FC<WorkModuleProps> = (props): JSX.Element => {
  const {content, background, slot} = props
  return (
    <StyledWork slot={slot} background={background}>
      <StyledSectionHeader slot={slot}>Work</StyledSectionHeader>
      <div className="inner">
        {content.map(item => (
          <Work
            key={item.company}
            company={item.company}
            highlights={item.highlights}
            pinned={item.pinned}
            startDate={item.startDate}
            endDate={item.endDate}
            website={item.website}
            summary={item.summary}
          />
        ))}
      </div>
    </StyledWork>
  )
}

const Work: React.FC<WorkProps> = (props): JSX.Element => {
  return <div>{props.company}</div>
}

export default WorkModule
