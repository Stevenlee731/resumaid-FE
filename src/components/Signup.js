import React, {forwardRef} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {StyledCenteredContainer, StyledButton} from '../styles/Components'
import {
  CURRENT_USER_QUERY,
  CHECK_USER_EMAIL_QUERY,
  CHECK_USER_NAME_QUERY,
} from '../graphql/Queries'
import {
  CREATE_USER_MUTATION,
  UNAUTHENTICATE_USER_MUTATION,
} from '../graphql/Mutations'
import {Link} from 'react-router-dom'
import {ThemeConsumer} from 'styled-components'
import {Logo} from '../assets/svg'
import {StyledSVGContainer, StyledInput, StyledForm} from '../styles/Components'
import {useForm, ErrorMessage} from 'react-hook-form'
import {useSafeUnMount, useImperativeQuery} from '../util/hooks'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import {handleValidate, unAuthAndClearCache} from '../util/helpers'

const Input = forwardRef(({type, value, handleChange}, ref) => {
  return (
    <StyledInput>
      <div>
        <input
          ref={ref}
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
})

function Signup() {
  const {register, handleSubmit, errors, setError, watch, getValues} = useForm({
    mode: 'onChange',
    validateCriteriaMode: 'all',
  })

  const checkUserNameAvailability = useImperativeQuery(CHECK_USER_NAME_QUERY)
  const checkUserEmailAvailability = useImperativeQuery(CHECK_USER_EMAIL_QUERY)

  const onSubmit = async fields => {
    const {username, email, password} = fields
    await signup({variables: {username, email, password}})
  }

  const [
    signup,
    {error: mutateError, loading: mutateLoading, data: signupData},
  ] = useMutation(CREATE_USER_MUTATION, {errorPolicy: 'all'})
  const [unAuth] = useMutation(UNAUTHENTICATE_USER_MUTATION, {
    errorPolicy: 'all',
  })
  const {client, data} = useQuery(CURRENT_USER_QUERY)
  const {authenticatedUser} = data || {}

  if (authenticatedUser) {
    return (
      <StyledCenteredContainer>
        <div style={{marginBottom: '20%'}}>
          <h2>
            <span>{`Hi ${authenticatedUser.basics?.name},`}</span>
            <span>Looks like you are already signed up!</span>
          </h2>
          <div className="button-group">
            <StyledButton inverted={true}>
              <Link to="/create">Edit your resume</Link>
            </StyledButton>
            <StyledButton inverted={false}>
              <Link
                onClick={() => unAuthAndClearCache(client, unAuth)}
                to="/signup"
              >{`Not ${authenticatedUser.basics?.name}?`}</Link>
            </StyledButton>
          </div>
        </div>
      </StyledCenteredContainer>
    )
  }

  if (signupData && signupData?.createUser) {
    return (
      <StyledCenteredContainer>
        <div style={{marginBottom: '20%'}}>
          <h2>Thank you for signing up!</h2>
          <div className="button-group">
            <StyledButton inverted={false}>
              <Link to="/signin">Sign in</Link>
            </StyledButton>
          </div>
        </div>
      </StyledCenteredContainer>
    )
  }

  return (
    <StyledCenteredContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <StyledSVGContainer height={'4rem'} width={'4rem'}>
            <ThemeConsumer>
              {theme => <Logo fill={theme.siteInverted} />}
            </ThemeConsumer>
          </StyledSVGContainer>
          <h2>Sign up for your free account!</h2>
        </div>
        <fieldset>
          <div className="field-container">
            <StyledInput className="input-container">
              <div>
                <input
                  type="text"
                  autoComplete="username"
                  placeholder={'Username'}
                  name="username"
                  ref={register({
                    required: true,
                    maxLength: 15,
                    validate: AwesomeDebouncePromise(async value => {
                      return await handleValidate(
                        value,
                        checkUserNameAvailability,
                        {
                          username: value,
                        },
                      )
                    }, 500),
                  })}
                />
              </div>
              <ErrorMessage errors={errors} name="username">
                {({messages}) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>
                      {type === 'pattern'
                        ? 'Please enter a valid username'
                        : 'Username is already in use'}
                    </p>
                  ))
                }
              </ErrorMessage>
            </StyledInput>

            <StyledInput className="input-container">
              <div>
                <input
                  type="text"
                  placeholder={'Email'}
                  name="email"
                  autoComplete="email"
                  ref={register({
                    required: true,
                    message: 'Invalid email address',
                    pattern: {
                      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'This input is number only.',
                    },
                    validate: AwesomeDebouncePromise(async value => {
                      return await handleValidate(
                        value,
                        checkUserEmailAvailability,
                        {
                          email: value,
                        },
                      )
                    }, 500),
                  })}
                />
              </div>
              <ErrorMessage errors={errors} name="email">
                {({messages}) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>
                      {type === 'pattern'
                        ? 'Please enter a valid email'
                        : 'Email is already in use'}
                    </p>
                  ))
                }
              </ErrorMessage>
            </StyledInput>

            <StyledInput className="input-container">
              <div>
                <input
                  placeholder={'Password'}
                  type="password"
                  autoComplete="new-password"
                  name={'password'}
                  ref={register({
                    required: true,
                    minLength: {
                      message: 'Your password needs to be 8 characters or more',
                      value: 8,
                    },
                  })}
                />
              </div>
              {errors.password1 && <p>{errors.password1.message}</p>}
            </StyledInput>

            <StyledInput className="input-container">
              <div>
                <input
                  placeholder={'Repeat password'}
                  type="password"
                  name={'password2'}
                  autoComplete="new-password"
                  ref={register({
                    required: true,
                    message: 'You must specify a password',
                    validate: value => {
                      if (value === getValues()['password']) {
                        return true
                      } else {
                        return 'The passwords do not match'
                      }
                    },
                  })}
                />
              </div>
              {errors.password2 && <p>{errors.password2.message}</p>}
            </StyledInput>
          </div>
          <button type="submit">
            {mutateLoading ? 'Signing up' : 'Sign Up!'}
          </button>
        </fieldset>
      </StyledForm>
    </StyledCenteredContainer>
  )
}

export default Signup
