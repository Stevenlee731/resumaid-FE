import styled from 'styled-components'
import {StyledPageProps} from '../types'

const StyledPage = styled.div<StyledPageProps>`
  background-color: ${({theme}): string => theme.background};

  transition: all ${({theme}): string => theme.transition};
  color: ${({theme}): string => theme.textDark};
  display: grid;
  overflow-x: hidden;
  grid-row-gap: 3rem;

  ${({theme}): string => theme.mobileM`
    grid-row-gap: 1rem;
    `}
`

export default StyledPage
