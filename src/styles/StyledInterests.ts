import styled from 'styled-components'
import StyledBaseModule from './StyledBaseModule'
import {StyledBaseModuleProps} from '../types'

const StyledInterests = styled(StyledBaseModule)<StyledBaseModuleProps>`
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  background-color: ${props => props.theme.secondary};
  border-radius: 20px;
`

export default StyledInterests
