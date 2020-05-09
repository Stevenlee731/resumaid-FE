import * as React from 'react'
import {BasicsModuleProps} from '../types'
import SocialMediaBar from '../components/SocialMediaBar'
import StyledBasics from '../styles/StyledBasics'
import StyledPortrait from '../styles/StyledPortrait'

const Basics: React.FC<BasicsModuleProps> = props => {
  const {
    name,
    label,
    image,
    summary,
    website,
    email,
    location,
    profiles,
  } = props.data

  return (
    <StyledBasics>
      <div className="left">
        <h1 title="name">My Name Is {name}</h1>
        <h2>
          {label && <span>{label}</span>} |
          <span>
            {location && location.city && ` based in ${location.city}`}
          </span>
        </h2>
        <summary>{summary}</summary>
        <div className="button-group">
          <a href={`mailto:${email}`}>Contact Me</a>
          <a href={website}>website</a>
        </div>
      </div>
      <div className="right">
        <StyledPortrait>
          <img alt={'main-image'} src={image} />
        </StyledPortrait>
        <SocialMediaBar profiles={profiles} />
      </div>
    </StyledBasics>
  )
}

export default Basics
