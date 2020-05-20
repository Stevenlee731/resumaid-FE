/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import useDimensions from 'react-cool-dimensions'
import {StyledNav, StyledNavSection} from '../styles/Nav'
import {StyledToggle, StyledLogin} from '../styles/Components'
import Dropdown from '../components/Dropdown'
import {IS_USER_AUTHED} from '../graphql/Queries'
import {breakpoints} from '../util/cssHelpers'
import throttle from 'lodash.throttle'

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
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false)
  const ref = React.useRef<HTMLElement>(null)
  const {currentBreakpoint} = useDimensions(ref, {
    breakpoints,
    onResize: ({width}: {width: number}) => {
      setIsDesktop(width > 812)
    },
  })

  return (
    <StyledNav ref={ref} className="navigation">
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
          {isDesktop ? (
            <div className="nav-right">
              <StyledNavSection>
                {isLoggedIn ? (
                  <StyledLogin>
                    <button>Login</button>
                  </StyledLogin>
                ) : (
                  <StyledLogin>
                    <span>{`Welcome AUTHED_USER`}</span>
                    <button>Log Out</button>
                  </StyledLogin>
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
          ) : (
            <Dropdown isDark={isDark} handleTheme={handleTheme} />
          )}
        </div>
      </div>
    </StyledNav>
  )
}

export default Header
