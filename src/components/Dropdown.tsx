import React from 'react'
import {GET_USER_MODULES_QUERY} from '../graphql/Queries'
import {NavLink} from 'react-router-dom'
import {useQuery, useApolloClient} from '@apollo/client'
import {useOnClickOutside} from '../util/hooks'
import {StyledDropdown, StyledToggle, StyledLogin} from '../styles/Components'
import {Hamburger} from '../assets/svg'

const Dropdown = ({
  handleTheme,
  isDark,
  isDesktop,
  unAuth,
}: {
  isDark: boolean
  isDesktop: boolean
  handleTheme: Function
  unAuth: Function
}): JSX.Element | null => {
  const {data} = useQuery(GET_USER_MODULES_QUERY)
  const client = useApolloClient()
  const ref = React.useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  const handleDropdown = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    setIsDropdownOpen(!isDropdownOpen)
  }

  useOnClickOutside(ref, () => setIsDropdownOpen(false))

  const {basics} = data || {}
  return (
    <>
      {!isDesktop && (
        <StyledDropdown isDropdownOpen={isDropdownOpen} ref={ref}>
          <div>
            <button
              onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                handleDropdown(e)
              }
              type="button"
              className="dropdown"
            >
              <Hamburger />
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
                  {basics && <a href={basics?.website}>website</a>}

                  <NavLink
                    to="/"
                    onClick={async () => {
                      const data = await unAuth()
                      console.log(data, 'unauth')
                      client.resetStore()
                    }}
                  >
                    Log Out
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </StyledDropdown>
      )}
    </>
  )
}

export default Dropdown
