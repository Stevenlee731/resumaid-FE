import React, {useState, useEffect} from 'react'
import {
  useMutation,
  useQuery,
  useLazyQuery,
  useApolloClient,
} from '@apollo/client'
import {StyledCenteredContainer} from '../styles/Components'
import {CURRENT_USER_QUERY} from '../graphql/Queries'
import {SIGNIN_MUTATION} from '../graphql/Mutations'
import {Link, Redirect} from 'react-router-dom'
import {ThemeConsumer} from 'styled-components'
import {useForm, useSafeUnMount} from '../util/hooks'
import {Logo} from '../assets/svg'
import {
  StyledSVGContainer,
  StyledFormOptions,
  StyledInput,
  StyledForm,
} from '../styles/Components'

const Input = ({type, value, handleChange}) => {
  return (
    <StyledInput className="input-container">
      <div>
        <input
          type={type}
          name={type}
          placeholder={type}
          value={value}
          onChange={handleChange}
          autoComplete={type}
        />
      </div>
    </StyledInput>
  )
}

function Signin() {
  const {inputs, handleChange, resetForm} = useForm({
    email: '',
    password: '',
  })
  const client = useApolloClient()
  const [signin, {error, loading, data}] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
  })

  const [getCurrentUser, {data: currentUser}] = useLazyQuery(CURRENT_USER_QUERY)
  useSafeUnMount(getCurrentUser)

  if (currentUser && currentUser.authenticatedUser) {
    return <Redirect to="create" />
  }

  if (error) {
    return <div>error</div>
  }

  if (data) {
    const {authenticateUserWithPassword} = data || {}
    const {item, token} = authenticateUserWithPassword || {}
    localStorage.setItem('token', token)
    client.writeQuery({
      query: CURRENT_USER_QUERY,
      data: {authenticatedUser: item},
    })

    return <Redirect to="create" />
  }

  return (
    <StyledCenteredContainer>
      <StyledForm
        method="post"
        onSubmit={async e => {
          e.preventDefault()
          try {
            await signin()
          } catch (e) {
            console.error(e)
          }
        }}
      >
        <div>
          <StyledSVGContainer height={'4rem'} width={'4rem'}>
            <ThemeConsumer>
              {theme => <Logo fill={theme.siteInverted} />}
            </ThemeConsumer>
          </StyledSVGContainer>
          <h2>Sign in to your account</h2>
          <p>
            or <Link to="/signup">Sign up with a free account!</Link>
          </p>
        </div>
        <fieldset disabled={loading} aria-busy={loading}>
          <div className="field-container">
            <Input
              type={'email'}
              value={inputs.email}
              handleChange={handleChange}
            />
            <Input
              type={'password'}
              value={inputs.password}
              handleChange={handleChange}
            />

            <StyledFormOptions>
              <div className="form-options">
                <input id="remember_me" type="checkbox" />
                <label htmlFor="remember_me">Remember me</label>
              </div>

              <div>
                <Link to={'/'}>Forget Your Password?</Link>
              </div>
            </StyledFormOptions>
          </div>
          <button type="submit">Sign In!</button>
        </fieldset>
      </StyledForm>
    </StyledCenteredContainer>
  )
}

export default Signin
