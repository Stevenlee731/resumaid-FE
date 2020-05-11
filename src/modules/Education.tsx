import * as React from 'react'
import {StyledEducation, StyledInstitution} from '../styles/Education'
import {StyledSectionHeader} from '../styles/Section'
import {EducationProps, EducationModuleProps} from '../types'

const Institution: React.FC<EducationProps> = (props): JSX.Element => {
  return (
    <StyledInstitution>
      <div>{props.institution}</div>
      <div>
        <span>{props.startDate}</span>
        <span> - </span>
        <span>{props.endDate}</span>
      </div>
      <div>
        <div>{props.area}</div>
        <div>{props.studyType}</div>
      </div>
    </StyledInstitution>
  )
}

const Education: React.FC<EducationModuleProps> = (props): JSX.Element => {
  const {data, layout} = props
  return (
    <StyledEducation layout={layout} background={props.background}>
      <StyledSectionHeader>Education</StyledSectionHeader>
      <div className="inner">
        {data.map(item => {
          return <Institution key={item.institution} {...item} />
        })}
      </div>
    </StyledEducation>
  )
}

export default Education
