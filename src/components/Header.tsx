/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import {Link} from 'react-router-dom'
import useDimensions from 'react-cool-dimensions'
import {StyledNav, StyledNavSection} from '../styles/Nav'
import {StyledToggle, StyledLogin} from '../styles/Components'
import Dropdown from '../components/Dropdown'
import {CURRENT_USER_QUERY} from '../graphql/Queries'
import {UNAUTHENTICATE_USER_MUTATION} from '../graphql/Mutations'
import {useQuery, useMutation, ApolloClient, FetchResult} from '@apollo/client'
import {breakpoints} from '../util/cssHelpers.js'
import throttle from 'lodash.throttle'

const unAuth = (apolloClient: ApolloClient<any>, unAuthMutation: any): void => {
  unAuthMutation()
  apolloClient.resetStore()
}

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
  const {client, data} = useQuery(CURRENT_USER_QUERY)
  const [unAuth] = useMutation(UNAUTHENTICATE_USER_MUTATION)
  const {authenticatedUser} = data || {}
  const {username} = authenticatedUser || {}

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
          {isDesktop && (
            <div className="nav-right">
              <StyledNavSection>
                {data ? (
                  <StyledLogin>
                    <span>{`Welcome ${username}`}</span>
                    <button
                      onClick={async () => {
                        const data = await unAuth()
                        console.log(data, 'unauth')
                        client.resetStore()
                      }}
                    >
                      Log Out
                    </button>
                  </StyledLogin>
                ) : (
                  <StyledLogin>
                    <button>
                      <Link to="/signin">Sign in!</Link>
                    </button>
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
          )}
          {!isDesktop && <Dropdown isDark={isDark} handleTheme={handleTheme} />}
        </div>
      </div>
    </StyledNav>
  )
}

export default Header
