import styled from 'styled-components'
import StyledBaseModule from './StyledBaseModule'
import {StyledBaseModuleProps} from '../types'

const StyledAwards = styled(StyledBaseModule)<StyledBaseModuleProps>`
  h1 {
    font-size: 6rem;
    margin: 0;
    font-weight: 700;
  }

  h2 {
    font-weight: 400;
  }

  > div {
    grid-column: span 2;
  }
`

export default StyledAwards
