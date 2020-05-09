import styled from 'styled-components'
import {StyledPageProps} from '../types'

const StyledPage = styled.div<StyledPageProps>`
  color: ${props => props.theme.black};
  display: grid;
  overflow-x: hidden;
  grid-row-gap: 2rem;
`

export default StyledPage
