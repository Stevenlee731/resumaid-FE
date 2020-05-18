import styled from 'styled-components'
import {StyledPageProps} from '../types'

const StyledPage = styled.div<StyledPageProps>`
  background-color: ${({theme}): string => theme.background};
  transition: all ${({theme}): string => theme.transition};
  color: ${({theme}): string => theme.textDark};
  display: grid;
  grid-gap: 2rem;
  grid-template-rows: auto auto 1fr auto;
  min-height: 100%;

  grid-template-columns:
    [viewport-start] minmax(20px, 1fr) [content-start] minmax(0, 60rem)
    [content-end] minmax(20px, 1fr) [viewport-end];

  grid-template-areas:
    'header header header'
    '. subheader .'
    '. content  .'
    'footer footer footer';

  grid-template-areas: ${({theme}): string => theme.tablet`
    grid-row-gap: 1rem;
    grid-gap: initial;
    grid-template-columns:
    [viewport-start] minmax(20px, 1fr) [content-start] minmax(0, 45rem)
    [content-end] minmax(20px, 1fr) [viewport-end];
    `};
`

export default StyledPage
