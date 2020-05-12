import * as React from 'react'
import {SocialIcon} from 'react-social-icons'
import {Profile} from '../types'
import StyledSocialMediaBar from '../styles/StyledSocialMediaBar'
import {ThemeConsumer} from 'styled-components'

const SocialMediaBar = ({
  profiles,
  email,
}: {
  profiles: Array<Profile>
  email: string
}): JSX.Element => {
  return (
    <StyledSocialMediaBar>
      {profiles.map((profile: Profile) => {
        return (
          <ThemeConsumer key={profile.network}>
            {theme => (
              <SocialIcon
                style={{height: '1.5rem', width: '1.5rem'}}
                url={profile.url}
                bgColor={theme.textLight}
              />
            )}
          </ThemeConsumer>
        )
      })}
      {email && (
        <ThemeConsumer>
          {theme => (
            <SocialIcon
              style={{height: '1.5rem', width: '1.5rem'}}
              network="email"
              url={`mailto:${email}`}
              bgColor={theme.textLight}
            />
          )}
        </ThemeConsumer>
      )}
    </StyledSocialMediaBar>
  )
}

export default SocialMediaBar
