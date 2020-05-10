import * as React from 'react'
import {SocialIcon} from 'react-social-icons'
import {Profile} from '../types'
import StyledSocialMediaBar from '../styles/StyledSocialMediaBar'

const SocialMediaBar = ({profiles, email}: any): JSX.Element => {
  return (
    <StyledSocialMediaBar>
      {profiles.map((profile: Profile) => {
        return (
          <SocialIcon
            style={{height: '1.5rem', width: '1.5rem'}}
            key={profile.network}
            url={profile.url}
          />
        )
      })}
      {email && (
        <SocialIcon
          style={{height: '1.5rem', width: '1.5rem'}}
          network="email"
          url={`mailto:${email}`}
        />
      )}
    </StyledSocialMediaBar>
  )
}

export default SocialMediaBar
