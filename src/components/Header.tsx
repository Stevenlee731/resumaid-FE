/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import {StyledNav, StyledNavSection} from '../styles/Nav'
import {StyledToggle, StyledLogin, StyledDropdown} from '../styles/Components'
import {IS_USER_AUTHED} from '../graphql/Queries'
import {isBrowser} from 'react-device-detect'
import {useOnClickOutside} from '../util/hooks'
import styled from 'styled-components'

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
  const ref = React.useRef<any>()
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  useOnClickOutside(ref, () => setIsDropdownOpen(false))

  const handleDropdown = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    setIsDropdownOpen(!isDropdownOpen)
  }

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
          {isBrowser ? (
            <div className="nav-right">
              <StyledNavSection>
                {false ? (
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
            <StyledDropdown isDropdownOpen={isDropdownOpen} ref={ref}>
              <div>
                <button
                  onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    handleDropdown(e)
                  }
                  type="button"
                  className="dropdown"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="icon-menu"
                  >
                    <path
                      className="secondary"
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  </svg>
                </button>
              </div>
              {isDropdownOpen && (
                <div className="popup">
                  <div className="outer-popup">
                    <div className="inner-popup">
                      <div>
                        <span className="dark-mode">
                          {isDark ? 'Dark Mode' : 'Light Mode'}
                        </span>
                        <StyledToggle
                          className={`switch ${isDark ? 'on' : 'off'}`}
                          onClick={(
                            e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
                          ): void => handleTheme(e)}
                        />
                      </div>

                      <form method="POST" action="#">
                        <button type="submit" className="signin">
                          Sign out
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </StyledDropdown>
          )}
        </div>
      </div>
    </StyledNav>
  )
}

export default Header
