/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import {StyledNav, StyledToggle, StyledNavSection} from '../styles/Nav'
import {IS_USER_AUTHED} from '../graphql/Queries'

const Header = ({
  handleTheme,
  isDark,
  name,
  website,
}: {
  handleTheme: Function
  isDark: boolean
  name?: string
  website?: string
}): JSX.Element => {
  return (
    <StyledNav className="navigation">
      <div className="outer-container">
        <div className="inner-container">
          <div className="nav-left">
            <div className="logo">
              <a href="#">{name}</a>
            </div>
            <div className="outer-directory">
              <div className="inner-directory">
                {website && <a href={website}>Website</a>}
              </div>
            </div>
          </div>
          <div className="nav-right">
            <StyledNavSection>
              {true ? (
                <button>Sign In</button>
              ) : (
                <>
                  <span>{`Welcome user`}</span>
                  <button>Sign Out</button>
                </>
              )}
            </StyledNavSection>
            <StyledNavSection>
              <span className="dark-mode">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
              <StyledToggle
                className={`switch ${isDark ? 'on' : 'off'}`}
                onClick={(
                  e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
                ): void => handleTheme(e)}
              />
            </StyledNavSection>
          </div>
        </div>
      </div>
    </StyledNav>
  )
}

export default Header
