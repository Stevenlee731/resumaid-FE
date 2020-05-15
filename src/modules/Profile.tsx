import * as React from 'react'
import StyledPortrait from '../styles/StyledPortrait'
import StyledProfile from '../styles/StyledProfile'
import SocialMediaBar from '../components/SocialMediaBar'

export default function Profile(props: any) {
  const {image, name, email, profiles, summary} = props

  return (
    <>
      <StyledProfile>
        <StyledPortrait>
          <img alt={'main-image'} src={image} />
        </StyledPortrait>
        <div title={name} className="button-group">
          <h4>{name}</h4>
          {profiles && <SocialMediaBar profiles={profiles} email={email} />}
        </div>
      </StyledProfile>
      <summary>{summary}</summary>
    </>
  )
}
