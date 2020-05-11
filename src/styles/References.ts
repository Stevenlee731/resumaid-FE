import styled from 'styled-components'
import StyledBaseModule from './StyledBaseModule'
import {StyledBaseModuleProps} from '../types'

export const StyledReferences = styled(StyledBaseModule)<StyledBaseModuleProps>`
  border-radius: 20px;
`

export const StyledQuote = styled.div`
  display: flex;
`

export const StyledReference = styled.div`
  display: flex;
`
