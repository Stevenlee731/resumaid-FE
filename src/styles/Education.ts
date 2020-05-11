import styled from 'styled-components'
import StyledBaseModule from './StyledBaseModule'
import {StyledBaseModuleProps} from '../types'

export const StyledEducation = styled(StyledBaseModule)<StyledBaseModuleProps>`
  background-color: ${({theme}): string => theme.primary};
  border-radius: 20px;
`

export const StyledInstitution = styled.div`
  display: grid;
  grid-template-areas: 'institution date' 'degree .';
  grid-template-rows: 3rem;
`
