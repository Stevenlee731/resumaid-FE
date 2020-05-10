import * as React from 'react'
import styled from 'styled-components'

const StyledNav = styled.nav`
  display: block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  .outer-container {
    padding: 0 2rem;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
  }
  .inner-container {
    height: 4rem;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }

  .nav-left {
    display: flex;
    align-items: center;
  }

  .logo {
    flex-shrink: 0;
    width: min-content;

    a {
      word-spacing: 9999px;
      color: black;
      text-align: left;
      font-weight: 700;
    }
  }

  .outer-directory {
    display: block;
  }

  .inner-directory {
    margin-left: 2.5rem;

    > a {
      text-transform: capitalize;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      border-radius: 0.375rem;
      color: #393939;
    }
  }
`

const Header: React.FC<any> = (props): JSX.Element => {
  const {modules, refs} = props
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
        </div>
      </div>
    </StyledNav>
  )
}

export default Header
