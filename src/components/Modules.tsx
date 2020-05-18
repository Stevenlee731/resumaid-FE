import React, {FC} from 'react'
import Awards from '../modules/Awards'
import Skills from '../modules/Skills'
import Education from '../modules/Education'
import References from '../modules/References'
import Work from '../modules/Work'
import Interests from '../modules/Interests'
import Basics from '../modules/Basics'

import {ModuleComponentList, ModulesProps} from '../types'

const moduleList: ModuleComponentList = {
  basics: Basics,
  awards: Awards,
  skills: Skills,
  education: Education,
  work: Work,
  references: References,
  interests: Interests,
}

const Modules: FC<ModulesProps> = props => {
  if (props.module && typeof moduleList[props.module] !== 'undefined') {
    return React.createElement(moduleList[props.module], {
      key: props.module,
      content: props.content,
      background: props.background,
      slot: props.slot,
    })
  }
  return React.createElement(
    () => <div>The component {props.module} has not been created yet.</div>,
    {key: props.module},
  )
}

export default Modules
