import styled from 'styled-components'
import {StyledTemplateProps} from '../types'

const StyledTemplate = styled.div<StyledTemplateProps>`
  background-color: ${({theme}): string => theme.background};
  transition: all ${({theme}): string => theme.transition};
  color: ${({theme}): string => theme.textDark};
  display: grid;
  grid-gap: 2rem;
  grid-template-rows: ${({hasSubheader}): string =>
    hasSubheader ? 'auto auto 1fr auto' : 'auto 1fr auto'};
  min-height: 100%;
  position: relative;

  grid-template-columns:
    [viewport-start] minmax(20px, 1fr) [content-start] minmax(0, 60rem)
    [content-end] minmax(20px, 1fr) [viewport-end];

  grid-template-areas: ${({hasSubheader}): string =>
    hasSubheader
      ? `'header header header'
    '. subheader .'
    'left content  right'
    'footer footer footer';`
      : `'header header header'
    'left content  right'
    'footer footer footer';`};

  ${({theme}): string => theme.tablet`
    grid-row-gap: 1rem;
    grid-column-gap: initial;
    grid-template-columns:
    [viewport-start] minmax(20px, 1fr) [content-start] minmax(0, 45rem)
    [content-end] minmax(20px, 1fr) [viewport-end];
  `}
`

export default StyledTemplate
