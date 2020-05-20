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
import {theme, darkTheme, breakpoints} from './util/cssHelpers'
import {ThemeProvider, createGlobalStyle} from 'styled-components'
import Page from './components/Page'
import Users from './components/Users'
import {endpoint, prodEndpoint} from './config'
import Home from './components/Home'
import Footer from './components/Footer'
import Signup from './components/Signup'
import useDimensions from 'react-cool-dimensions'
import {GET_VIEWPORT_INFO} from './graphql/Queries'
import Header from './components/Header'
import styled from 'styled-components'
import {Wave} from './assets/svg'

const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
  }),
})

const GlobalStyle = createGlobalStyle<{theme: typeof theme}>`
  html,
  body {
    background: ${({theme}): string => theme.background};
  }
`

const App = (): JSX.Element => {
  const cachedDarkMode = localStorage.getItem('isDarkMode') === 'true'
  const ref = React.useRef<HTMLDivElement>(null)
  const {currentBreakpoint, width} = useDimensions(ref, {
    breakpoints,
    onResize: ({
      currentBreakpoint,
      width,
    }: {
      currentBreakpoint: string
      width: number
    }) => {
      client.writeQuery({
        query: GET_VIEWPORT_INFO,
        data: {currentBreakpoint, width},
      })
    },
  })

  client.writeQuery({
    query: GET_VIEWPORT_INFO,
    data: {currentBreakpoint, width},
  })

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
        <div style={{height: '100%'}} ref={ref}>
          <Routes>
            <Route
              path="/"
              element={
                <Page>
                  <Header handleTheme={handleTheme} isDark={isDark} />
                  <Home />
                  <Wave width={width} />
                  <Footer isDark={isDark} />
                </Page>
              }
            />
            <Route
              path="/signup"
              element={
                <Page>
                  <Signup />
                  <Footer isDark={isDark} />
                </Page>
              }
            />
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
        </div>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
