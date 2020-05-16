import styled from 'styled-components'
import {StyledPageProps} from '../types'

const StyledPage = styled.div<StyledPageProps>`
  background-color: ${({theme}): string => theme.background};
  transition: all ${({theme}): string => theme.transition};
  color: ${({theme}): string => theme.textDark};
  display: grid;
  overflow-x: hidden;
  grid-gap: 2rem;

  grid-template-columns:
    [viewport-start] minmax(20px, 1fr) [content-start] minmax(0, 45rem)
    [content-end] minmax(0, 15rem) [sidebar-end] minmax(20px, 1fr) [viewport-end];
  grid-template-areas:
    'header header header header'
    '. subheader subheader .'
    '. content sidebar .'
    'footer footer footer footer';

  ${({theme}): string => theme.tablet`
    grid-row-gap: 1rem;
    grid-template-areas:
    'header header header'
    '. subheader .'
    '. content .';

    grid-gap: initial;
    grid-template-columns:
    [viewport-start] minmax(20px, 1fr) [content-start] minmax(0, 45rem)
    [content-end] minmax(20px, 1fr) [viewport-end];
    `}
`

export default StyledPage
