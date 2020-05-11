import styled from 'styled-components'
import StyledBaseModule from './StyledBaseModule'
import {StyledBaseModuleProps} from '../types'

const StyledReferences = styled(StyledBaseModule)<StyledBaseModuleProps>`
  background-color: ${({theme}): string => theme.secondary};
  border-radius: 20px;
`

export default StyledReferences
