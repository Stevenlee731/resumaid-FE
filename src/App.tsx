/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react'
import './normalize.css'
import './App.css'
import {Route, Switch} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'

import {usePersistedApolloClient} from './util/hooks'
import {theme, darkTheme, GlobalStyle} from './util/cssHelpers.js'
import {ThemeProvider, createGlobalStyle} from 'styled-components'
import {Wave} from './assets/svg'

import Page from './components/Page'
import Users from './components/Users'
import Home from './components/Home'
import Footer from './components/Footer'
import Signup from './components/Signup'
import Header from './components/Header'
import Signin from './components/Signin'
import Create from './components/Create'
import Template from './components/Template'

// function PrivateRoute({children: any, ...rest}) {
//   return (
//     <Route
//       {...rest}
//       render={({location}) =>
//         fakeAuth.isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: {from: location},
//             }}
//           />
//         )
//       }
//     />
//   )
// }

const App = (): JSX.Element => {
  const {client} = usePersistedApolloClient()

  const cachedDarkMode = localStorage.getItem('isDarkMode') === 'true'
  const [isDark, setIsDark] = useState<boolean>(cachedDarkMode)

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDark.toString())
  }, [isDark])

  if (client === undefined) return <div>Loading...</div>

  const handleTheme = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    e.preventDefault()
    setIsDark(!isDark)
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDark ? darkTheme : theme}>
        <GlobalStyle />
        <Page>
          <Switch>
            <Route exact path="/">
              <Template hasSubheader={false}>
                <Header handleTheme={handleTheme} isDark={isDark} />
                <Home />
                <Wave />
                <Footer isDark={isDark} />
              </Template>
            </Route>
            <Route path="/signup">
              <Template hasSubheader={false}>
                <Header handleTheme={handleTheme} isDark={isDark} />
                <Signup />
                <Wave />
                <Footer isDark={isDark} />
              </Template>
            </Route>
            <Route path="/signin">
              <Template hasSubheader={false}>
                <Header handleTheme={handleTheme} isDark={isDark} />
                <Signin />
                <Wave />
                <Footer isDark={isDark} />
              </Template>
            </Route>

            <Route path="/create">
              <Template hasSubheader={false}>
                <Header handleTheme={handleTheme} isDark={isDark} />
                <Create />
                <Footer isDark={isDark} />
              </Template>
            </Route>
            <Route path="/:userId">
              <Template hasSubheader={true}>
                <Users isDark={isDark} handleTheme={handleTheme} />
                <Footer isDark={isDark} />
              </Template>
            </Route>
          </Switch>
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
