import React from 'react'
import {GET_USER_MODULES} from '../graphql/Queries'
import {useQuery} from '@apollo/client'
import {useOnClickOutside} from '../util/hooks'
import {StyledDropdown, StyledToggle, StyledLogin} from '../styles/Components'
import {Hamburger} from '../assets/svg'

const Dropdown = ({
  handleTheme,
  isDark,
}: {
  isDark: boolean
  handleTheme: Function
}): JSX.Element => {
  const {data} = useQuery(GET_USER_MODULES)

  const ref = React.useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  const handleDropdown = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    setIsDropdownOpen(!isDropdownOpen)
  }

  useOnClickOutside(ref, () => setIsDropdownOpen(false))

  const {basics} = data || {}
  return (
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
  )
}

export default Dropdown
