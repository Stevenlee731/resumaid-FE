import React from 'react'
import {Link} from 'react-router-dom'
import StyledHome from '../styles/StyledHome'
import {StyledButton} from '../styles/Components'
import {useLazyQuery, useApolloClient, useMutation} from '@apollo/client'
import {CURRENT_USER_QUERY} from '../graphql/Queries'
import {UNAUTHENTICATE_USER_MUTATION} from '../graphql/Mutations'
import {unAuthAndClearCache} from '../util/helpers'
import {useSafeUnMount} from '../util/hooks'

export default function Home(): JSX.Element {
  const client = useApolloClient()
  const [getCurrentUser, {data}] = useLazyQuery(CURRENT_USER_QUERY)
  const [unAuth] = useMutation(UNAUTHENTICATE_USER_MUTATION)

  useSafeUnMount(getCurrentUser)

  const {authenticatedUser} = data || {}

  return (
    <StyledHome>
      <div className="hero">
        <h2 className="header">
          <span className="text-primary">Leave a killer</span>
          <span className="text-secondary">(digital) impression</span>
        </h2>
        <p className="subheader">Create a free online portfolio in minutes!</p>
        <div className="button-group">
          {authenticatedUser && authenticatedUser.basics?.name ? (
            <>
              <StyledButton inverted={true}>
                <Link to="/create">Edit your resume</Link>
              </StyledButton>
              <StyledButton inverted={false}>
                <Link
                  onClick={() => unAuthAndClearCache(client, unAuth)}
                  to="/signup"
                >{`Not ${authenticatedUser.basics?.name}?`}</Link>
              </StyledButton>
            </>
          ) : (
            <>
              <StyledButton inverted={false}>
                <Link to="/signup">Get Started</Link>
              </StyledButton>
              <StyledButton inverted={true}>
                <Link to="/signin">Sign in!</Link>
              </StyledButton>
            </>
          )}
        </div>
      </div>
    </StyledHome>
  )
}
