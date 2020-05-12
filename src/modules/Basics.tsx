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
    layout,
  } = props

  return (
    <StyledBasics background={layout}>
      <div className="headline">
        <h1>
          {label && <span>{`I'm a ${label},`}</span>}
          <span>
            {location && location.city && ` based in ${location.city}`}
          </span>
          <span className="period">.</span>
        </h1>
      </div>
      <div className="info">
        <StyledProfile>
          <StyledPortrait>
            <img alt={'main-image'} src={image} />
          </StyledPortrait>
          <div className="button-group">
            <h4>{name}</h4>
            <SocialMediaBar profiles={profiles} email={email} />
          </div>
        </StyledProfile>
        <summary>{summary}</summary>
      </div>
    </StyledBasics>
  )
}

export default Basics
