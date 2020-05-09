import styled from 'styled-components'
import StyledBaseModule from './StyledBaseModule'
import {StyledBaseModuleProps} from '../types'

const StyledReferences = styled(StyledBaseModule)<StyledBaseModuleProps>`
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  background-color: ${props => props.theme.tertiary};
  border-radius: 20px;

  .left {
    .button-group {
      padding: 2rem 0;
    }
    a {
      background-color: ${props => props.theme.secondary};
      color: ${props => props.theme.primary};
      padding: 10px 15px;
      border-radius: 10px;
      text-transform: uppercase;
      font-weight: bold;
    }

    a + a {
      margin-left: 10px;
    }
  }

  summary {
    color: #868893;
    line-height: 1.5;
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

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

export default StyledReferences
