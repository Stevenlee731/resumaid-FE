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
import {ThemeProvider} from 'styled-components'
import Page from './components/Page'
import Users from './components/Users'
import StyledFooter from './styles/StyledFooter'
import {endpoint, prodEndpoint} from './config'
import {IS_DARK_MODE} from './graphql/Queries'

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
        <Page>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="create" element={<div>create</div>} />
            <Route
              path=":userId"
              element={<Users isDark={isDark} handleTheme={handleTheme} />}
            />
          </Routes>
          <StyledFooter>footer</StyledFooter>
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
