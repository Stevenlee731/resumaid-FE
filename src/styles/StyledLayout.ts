import styled from 'styled-components'
import {StyledLayoutProps} from '../types'

const StyledLayout = styled.div<StyledLayoutProps>`
  background-color: ${({theme}): string => theme.background};
  transition: all ${({theme}): string => theme.transition};
  color: ${({theme}): string => theme.textDark};
  display: grid;
  overflow-x: hidden;
  grid-gap: 2rem;
  min-height: 100%;
  grid-area: content;

  grid-template-columns: ${(props): string =>
    props.hasSidebar ? `3fr 1fr` : `1fr`};

  grid-template-areas: ${(props): string =>
    props.hasSidebar ? `'main sidebar'` : `'main'`};

  grid-template-areas: ${({theme}): string => theme.tablet`
    grid-row-gap: 1rem;
    grid-template-areas: 'main';
    grid-gap: initial;`};
`

export default StyledLayout
