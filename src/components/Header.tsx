import * as React from 'react'
import {StyledNav, StyledToggle} from '../styles/Nav'

const Header = ({
  handleTheme,
  isDark,
  modules,
  refs,
}: {
  handleTheme: Function
  isDark: boolean
  modules: Array<any>
  refs: any
}): JSX.Element => {
  const [basics, ...rest] = modules

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: string,
  ): void => {
    e.preventDefault()
    refs[item].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <StyledNav className="navigation">
      <div className="outer-container">
        <div className="inner-container">
          <div className="nav-left">
            <div className="logo">
              <a href="#">{basics?.data?.name}</a>
            </div>
            <div className="outer-directory">
              <div className="inner-directory">
                {modules &&
                  modules
                    .filter((item: any) => item.module !== 'basics')
                    .map((item: any) => {
                      return (
                        <a
                          key={item.module}
                          href="#"
                          onClick={(e): void => handleClick(e, item.module)}
                        >
                          {item.module}
                        </a>
                      )
                    })}
                {basics?.data?.website && (
                  <a href={basics?.data?.website}>Website</a>
                )}
              </div>
            </div>
          </div>
          <div className="nav-right">
            <span className="dark-mode">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <StyledToggle
              className={`switch ${isDark ? 'on' : 'off'}`}
              onClick={e => handleTheme(e)}
            />
          </div>
        </div>
      </div>
    </StyledNav>
  )
}

export default Header
