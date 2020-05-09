import * as React from 'react'
import {SkillsProps, SkillsModuleProps} from '../types'
import StyledSkills from '../styles/StyledSkills'

const SkillsModule: React.FC<SkillsModuleProps> = (props): JSX.Element => {
  const {data, background, layout} = props
  return (
    <StyledSkills layout={layout} background={background}>
      <h3>Skills</h3>
      <div>
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

const Skill: React.FC<SkillsProps> = (props): JSX.Element => {
  return <div>{props.name}</div>
}

export default SkillsModule
