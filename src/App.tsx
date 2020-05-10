/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
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
import mediaQueries from './util/cssHelpers'
import {ThemeProvider} from 'styled-components'
import Page from './components/Page'
import Users from './components/Users'
import Header from './components/Header'

if (process.env.NODE_ENV === 'development') {
  require('./mocks')
}

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  background: '#333646',
  primary: '#FFF',
  secondary: '#bfd3da',
  tertiary: '#ffefe8',
  ...mediaQueries,
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
  }),
})

const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Page>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path=":userId" element={<Users />} />
          </Routes>
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
