/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react'
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

if (process.env.NODE_ENV === 'development') {
  require('./mocks')
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
  }),
})

const App = (): JSX.Element => {
  const [isDark, setIsDark] = useState<boolean>(false)

  const handleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDark ? darkTheme : theme}>
        <Page>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route
              path=":userId"
              element={<Users isDark={isDark} handleTheme={handleTheme} />}
            />
          </Routes>
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
