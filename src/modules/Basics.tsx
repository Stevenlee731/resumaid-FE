import * as React from 'react'
import {BasicsModuleProps} from '../types'
import StyledBasics from '../styles/StyledBasics'

const Basics: React.FC<BasicsModuleProps> = props => {
  const {label, location} = props

  return (
    <StyledBasics background={''}>
      {label && location && (
        <div className="headline">
          <h1 title="basics">
            <span title="label">{`I'm a ${label}${
              location?.city ? ',' : ''
            }`}</span>
            <span title="location">
              {location?.city && ` based in ${location?.city}`}
            </span>
            <span className="period">.</span>
          </h1>
        </div>
      )}
    </StyledBasics>
  )
}

export default Basics
