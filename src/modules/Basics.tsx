import * as React from 'react'
import {BasicsProps} from '../types'
import SocialMediaBar from '../components/SocialMediaBar'
import StyledBasics from '../styles/StyledBasics'
import StyledPortrait from '../styles/StyledPortrait'

const Basics: React.FC<BasicsProps> = props => {
  const {
    name,
    label,
    image,
    summary,
    website,
    email,
    location,
    profiles,
  } = props

  return (
    <StyledBasics>
      <div className="left">
        <h1 title="name">My Name Is {name}</h1>
        <h2>{label}</h2>
        <summary>{summary}</summary>
        <div className="button-group">
          <a href={`mailto:${email}`}>Contact Me</a>
          <a href={website}>website</a>
        </div>
        {location && location.city && <div>{`based in ${location.city}`}</div>}
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
