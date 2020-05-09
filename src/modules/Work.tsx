import * as React from 'react'
import {BaseModuleProps, WorkProps} from '../types'
import StyledWork from '../styles/StyledWork'

interface WorkModuleProps extends BaseModuleProps {
  data: Array<WorkProps>
}

const WorkModule: React.FC<WorkModuleProps> = (props): JSX.Element => {
  const {data, background, layout} = props
  return (
    <StyledWork layout={layout} background={background}>
      <h3>Work</h3>
      <div>
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
