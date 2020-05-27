/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import {Link, NavLink} from 'react-router-dom'
import useDimensions from 'react-cool-dimensions'
import {StyledNav, StyledNavSection} from '../styles/Nav'
import {
  StyledToggle,
  StyledLogin,
  StyledSVGContainer,
} from '../styles/Components'
import Dropdown from '../components/Dropdown'
import {CURRENT_USER_QUERY} from '../graphql/Queries'
import {UNAUTHENTICATE_USER_MUTATION} from '../graphql/Mutations'
import {useQuery, useMutation, ApolloClient, FetchResult} from '@apollo/client'
import {breakpoints} from '../util/cssHelpers.js'
import {Logo} from '../assets/svg'
import {ThemeConsumer} from 'styled-components'

const unAuthAndClearCache = async (
  apolloClient: ApolloClient<any>,
  unAuthMutation: any,
) => {
  const {data} = await unAuthMutation()
  if (data?.unauthenticateUser?.success) {
    apolloClient.resetStore()
  }
  //trigger modal for unsuccessful logout
}

const Header = ({
  handleTheme,
  isDark,
}: {
  handleTheme: Function
  isDark: boolean
}): JSX.Element => {
  const ref = React.useRef<HTMLElement>(null)
  const {client, data} = useQuery(CURRENT_USER_QUERY)
  const [unAuth] = useMutation(UNAUTHENTICATE_USER_MUTATION, {
    errorPolicy: 'all',
  })
  const {authenticatedUser} = data || {}
  const {username} = authenticatedUser || {}

  const [isDesktop, setIsDesktop] = React.useState<boolean>(false)
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
              <Link to="/">
                <StyledSVGContainer height={'2rem'} width={'2rem'}>
                  <ThemeConsumer>
                    {(theme): JSX.Element => <Logo fill={theme.siteInverted} />}
                  </ThemeConsumer>
                </StyledSVGContainer>
                <span>PortfoliOrca</span>
              </Link>
            </div>
            <div className="outer-directory">
              {/* <div className="inner-directory">
                {website && <a href={website}>Website</a>}
              </div> */}
            </div>
          </div>
          {isDesktop && (
            <div className="nav-right">
              <StyledNavSection>
                {authenticatedUser ? (
                  <StyledLogin>
                    <span>{`Welcome ${username}`}</span>
                    <NavLink
                      to="/"
                      onClick={() => unAuthAndClearCache(client, unAuth)}
                    >
                      Log Out
                    </NavLink>
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
          <Dropdown
            unAuth={unAuth}
            isDesktop={isDesktop}
            isDark={isDark}
            handleTheme={handleTheme}
          />
        </div>
      </div>
    </StyledNav>
  )
}

export default Header
