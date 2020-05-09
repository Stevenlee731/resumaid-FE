import * as React from 'react'
import {SocialIcon} from 'react-social-icons'
import {Profile} from '../types'
import StyledSocialMediaBar from '../styles/StyledSocialMediaBar'

const SocialMediaBar = ({profiles}: any): JSX.Element => {
  return (
    <StyledSocialMediaBar>
      {profiles.map((profile: Profile) => {
        return (
          <SocialIcon key={profile.network} url={profile.url} bgColor="white" />
        )
      })}
    </StyledSocialMediaBar>
  )
}

export default SocialMediaBar
