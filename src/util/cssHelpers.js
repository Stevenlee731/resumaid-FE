/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {css, createGlobalStyle} from 'styled-components'

export const breakpoints = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  mobileXL: 812,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
}

const mediaQueries = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}px) {
      ${css(...args)};
    }
  `
  return acc
}, {})

const defaultStyle = {
  transition: '0.6s',
  maxWidth: '60rem',
  boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
}

export const theme = {
  black: '#393939',
  textDark: '#393939',
  textLight: '#868893',
  maxWidth: '60rem',
  nav: '#fff',
  background: '#fff',
  secondary: '#ffefe8',
  primary: '#bfd3da',
  border: 'rgba(0,0,0,0.06)',
  sitePrimary: '#457B9D',
  siteSecondary: '#457B9D',
  siteInverted: '#457B9D',
  ...defaultStyle,
  ...mediaQueries,
}

export const darkTheme = {
  black: '#393939',
  textDark: '#fff',
  textLight: '#c3c3c3',
  nav: '#242526',
  background: '#18191A',
  secondary: '#242526',
  primary: '#33353a',
  border: '#3A3B3D',
  sitePrimary: '#242526',
  siteSecondary: '#33353a',
  siteInverted: '#fff',
  ...defaultStyle,
  ...mediaQueries,
}

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    background: ${({theme}) => theme.background};
  }
`
