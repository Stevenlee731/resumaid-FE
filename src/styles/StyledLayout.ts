import styled from 'styled-components'
import {StyledLayoutProps} from '../types'

const StyledLayout = styled.div<StyledLayoutProps>`
  background-color: ${({theme}): string => theme.background};
  transition: all ${({theme}): string => theme.transition};
  color: ${({theme}): string => theme.textDark};
  display: grid;
  grid-gap: 2rem;
  grid-area: content;

  margin-bottom: 2rem;

  grid-template-columns: ${(props): string =>
    props.hasSidebar ? `3fr 1fr` : `1fr`};

  grid-template-areas: ${(props): string =>
    props.hasSidebar ? `'main sidebar'` : `'main'`};

  ${({theme}): string => theme.mobileL`
    grid-row-gap: 1rem;
    grid-template-areas: 'sidebar' 'main';
    grid-template-columns: 1fr;
    grid-gap: initial;`};
`

export default StyledLayout
