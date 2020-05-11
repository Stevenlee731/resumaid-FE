import {css} from 'styled-components'

export const sizes = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
}

const mediaQueries = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `
  return acc
}, {})

export const theme = {
  black: '#393939',
  textDark: '#393939',
  textLight: '#868893',
  maxWidth: '60rem',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  nav: '#fff',
  background: '#fff',
  primary: '#bfd3da',
  secondary: '#ffefe8',
  ...mediaQueries,
}

export const darkTheme = {
  black: '#393939',
  textDark: '#393939',
  textLight: '#868893',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  nav: '#242526',
  background: '#18191A',
  primary: '#bfd3da',
  secondary: '#ffefe8',
  ...mediaQueries,
}
