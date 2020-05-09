import styled from 'styled-components'
import StyledBaseModule from './StyledBaseModule'
import {StyledBaseModuleProps} from '../types'

const StyledSkills = styled(StyledBaseModule)<StyledBaseModuleProps>`
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  background-color: ${props => props.theme.secondary};
  border-radius: 20px;

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

export default StyledSkills
