import * as React from 'react'
import {SkillsProps, SkillsModuleProps} from '../types'
import StyledSkills from '../styles/StyledSkills'
import {StyledSectionHeader} from '../styles/Section'

const Skill: React.FC<SkillsProps> = (props): JSX.Element => {
  return (
    <div>
      <div>{props.name}</div>
      <div>
        {props.keywords &&
          props.keywords.map(word => {
            return <div>{word}</div>
          })}
      </div>
    </div>
  )
}

const SkillsModule: React.FC<SkillsModuleProps> = (props): JSX.Element => {
  const {data, background, layout} = props
  return (
    <StyledSkills layout={layout} background={background}>
      <StyledSectionHeader>Skills</StyledSectionHeader>
      <div className="inner">
        {data.map(skill => (
          <Skill
            key={skill.name}
            name={skill.name}
            keywords={skill.keywords}
            level={skill.level}
          />
        ))}
      </div>
    </StyledSkills>
  )
}

export default SkillsModule
