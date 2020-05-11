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

const defaultStyle = {
  transition: '0.6s',
  maxWidth: '60rem',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
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
  primary: '#3A3B3D',
  ...defaultStyle,
  ...mediaQueries,
}
