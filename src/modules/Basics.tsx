import * as React from 'react'
import {BasicsModuleProps} from '../types'
import SocialMediaBar from '../components/SocialMediaBar'
import StyledBasics from '../styles/StyledBasics'
import StyledPortrait from '../styles/StyledPortrait'
import StyledProfile from '../styles/StyledProfile'

const Basics: React.FC<BasicsModuleProps> = props => {
  const {name, label, image, summary, email, location, profiles} = props

  return (
    <>
      <StyledBasics background={''}>
        <div className="headline">
          <h1 title="basics">
            {label && <span title="label">{`I'm a ${label},`}</span>}
            <span title="location">
              {location && location.city && ` based in ${location.city}`}
            </span>
            <span className="period">.</span>
          </h1>
        </div>
      </StyledBasics>
    </>
  )
}

export default Basics
