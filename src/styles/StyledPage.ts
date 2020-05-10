import styled from 'styled-components'
import {StyledPageProps} from '../types'

const StyledPage = styled.div<StyledPageProps>`
  color: ${props => props.theme.black};
  display: grid;
  overflow-x: hidden;
  grid-row-gap: 3rem;

  ${({theme}): string => theme.mobileM`
    grid-row-gap: 1rem;
    `}
`

export default StyledPage
