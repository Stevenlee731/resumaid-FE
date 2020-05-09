import styled from 'styled-components'
import {StyledSectionProps} from '../types'

const StyledSection = styled.div<StyledSectionProps>`
  display: grid;
  overflow-x: hidden;
  grid-template-columns:
    [viewport-start] minmax(20px, 1fr) [content-start] minmax(0, 1248px)
    [content-end] minmax(20px, 1fr) [viewport-end];
`

export default StyledSection
