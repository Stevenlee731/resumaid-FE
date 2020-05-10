import * as React from 'react'
import StyledEducation from '../styles/StyledEducation'
import {EducationProps, EducationModuleProps} from '../types'

export default function Education(props: EducationModuleProps): JSX.Element {
  const {data, layout} = props
  return (
    <StyledEducation layout={layout} background={props.background}>
      <h3>Education</h3>
      <div>
        {data.map(item => {
          return <div key={item.institution}>list</div>
        })}
      </div>
    </StyledEducation>
  )
}
