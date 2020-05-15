import styled from 'styled-components'
import StyledBaseModule from './StyledBaseModule'
import {StyledBaseModuleProps} from '../types'

export const StyledEducation = styled(StyledBaseModule)<StyledBaseModuleProps>``

export const StyledInstitution = styled.div`
  display: grid;
  grid-template-areas: 'institution date' 'degree .';
  grid-template-rows: 3rem;
`
