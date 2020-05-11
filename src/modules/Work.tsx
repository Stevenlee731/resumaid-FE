import * as React from 'react'
import {BaseModuleProps, WorkProps} from '../types'
import StyledWork from '../styles/StyledWork'
import {StyledSectionHeader} from '../styles/Section'

interface WorkModuleProps extends BaseModuleProps {
  data: Array<WorkProps>
}

const WorkModule: React.FC<WorkModuleProps> = (props): JSX.Element => {
  const {data, background} = props
  return (
    <StyledWork background={background}>
      <StyledSectionHeader>Work</StyledSectionHeader>
      <div className="inner">
        {data.map(item => (
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
