/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react'
import './normalize.css'
import './App.css'
import {Routes, Route, useParams} from 'react-router-dom'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client'
import {theme, darkTheme} from './util/cssHelpers'
import {ThemeProvider, createGlobalStyle} from 'styled-components'
import Page from './components/Page'
import Users from './components/Users'
import {endpoint, prodEndpoint} from './config'
import Home from './components/Home'
import Footer from './components/Footer'

const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
  }),
  resolvers: {
    Mutation: {
      toggleTodo: (_root, variables, {cache}) => {
        const user = cache.identify({
          __typename: 'User',
          user: variables.user,
        })

        cache.modify(user, {
          completed(value: any) {
            return !value
          },
        })
        return null
      },
    },
  },
})

cache.writeQuery({
  query: gql`
    query GetTodosNetworkStatusAndFilter {
      user
    }
  `,
  data: {
    user: [],
  },
})

const GlobalStyle = createGlobalStyle<{theme: typeof theme}>`
  html,
  body {
    background: ${({theme}): string => theme.background};
  }
`

const App = (): JSX.Element => {
  const cachedDarkMode = localStorage.getItem('isDarkMode') === 'true'
  const [isDark, setIsDark] = useState<boolean>(cachedDarkMode)

  const handleTheme = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    e.preventDefault()

    setIsDark(!isDark)
  }

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDark.toString())
  }, [isDark])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDark ? darkTheme : theme}>
        <GlobalStyle />
        <Routes>
          <Route
            path="/"
            element={
              <Page>
                <Home handleTheme={handleTheme} isDark={isDark} />
                <Footer isDark={isDark} />
              </Page>
            }
          />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="create" element={<div>create</div>} />
          <Route
            path=":userId"
            element={
              <Page>
                <Users isDark={isDark} handleTheme={handleTheme} />
                <Footer isDark={isDark} />
              </Page>
            }
          />
        </Routes>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
