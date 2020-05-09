import styled from 'styled-components'
import {StyledPageProps} from '../types'

const StyledPage = styled.div<StyledPageProps>`
  background: white;
  color: ${props => props.theme.black};
  background: ${props => props.theme.background};
  display: grid;
  overflow-x: hidden;
  grid-template-columns:
    [viewport-start] minmax(20px, 1fr) [content-start] minmax(0, 1248px)
    [content-end] minmax(20px, 1fr) [viewport-end];
`

export default StyledPage