import styled from 'styled-components'
import StyledBaseModule from './StyledBaseModule'
import {StyledBaseModuleProps} from '../types'

const StyledInterests = styled(StyledBaseModule)<StyledBaseModuleProps>`
  background-color: ${({theme}): string => theme.primary};
  border-radius: 20px;
`

export default StyledInterests
