import React, {useState, useEffect} from 'react'
import {useMutation, useQuery, useApolloClient} from '@apollo/client'
import {StyledCenteredContainer} from '../styles/Components'
import {CURRENT_USER_QUERY} from '../graphql/Queries'
import {SIGNIN_MUTATION} from '../graphql/Mutations'
import {Link} from 'react-router-dom'

function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial)

  function handleChange(e) {
    let {value} = e.target
    const {name, type} = e.target
    if (type === 'number') {
      value = parseInt(value)
    }
    if (type === 'file') {
      ;[value] = e.target.files
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  function resetForm() {
    setInputs(initial)
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, '']),
    )
    setInputs(blankState)
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  }
}

function Signin() {
  const {inputs, handleChange, resetForm} = useForm({
    email: '',
    password: '',
  })
  const client = useApolloClient()
  const [signin, {error, loading, data}] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // update(cache, {data: {signin}}) {
    //   const x = cache.readQuery({query: CURRENT_USER_QUERY})
    //   console.log(x)
    //   cache.writeQuery({
    //     query: CURRENT_USER_QUERY,
    //     data: {authenticatedUser: signin},
    //   })
    // },
  })

  if (data) {
    const {authenticateUserWithPassword} = data || {}
    const {item, token} = authenticateUserWithPassword || {}
    localStorage.setItem('token', token)
    client.writeQuery({
      query: CURRENT_USER_QUERY,
      data: {authenticatedUser: item},
    })

    return <div>data</div>
  }

  return (
    <StyledCenteredContainer>
      <form
        method="post"
        onSubmit={async e => {
          e.preventDefault()
          const res = await signin()
          console.log(res)
          resetForm()
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          {/* <Error error={error} /> */}
          <div>
            <div>Image</div>
            <h2>Sign into your account</h2>
            <p>
              or <Link to="/signup">Sign up with a free account!</Link>
            </p>
          </div>
          <div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={inputs.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={inputs.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div class="mt-6 flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label
                  for="remember_me"
                  class="ml-2 block text-sm leading-5 text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div class="text-sm leading-5">
                <Link to={'/'}>Forget Your Password?</Link>
              </div>
            </div>
          </div>
          <button type="submit">Sign In!</button>
        </fieldset>
      </form>
    </StyledCenteredContainer>
  )
}

export default Signin
