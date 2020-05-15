import * as React from 'react'
import {BasicsModuleProps} from '../types'
import SocialMediaBar from '../components/SocialMediaBar'
import StyledBasics from '../styles/StyledBasics'
import StyledPortrait from '../styles/StyledPortrait'
import StyledProfile from '../styles/StyledProfile'

const Basics: React.FC<BasicsModuleProps> = props => {
  const {
    data: {
      name = '',
      label = '',
      image = '',
      summary = '',
      email = '',
      location = '',
      profiles = [],
    } = {},
  } = props

  return (
    <>
      <StyledBasics background={''}>
        <div className="headline">
          <h1 title="basics">
            {label && <span>{`I'm a ${label},`}</span>}
            <span>
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
