import styled from 'styled-components'
import {StyledBaseModuleProps} from '../types'

const StyledBaseModule = styled.div<StyledBaseModuleProps>`
  background-color: ${({theme, background}): string => theme[background]};
  transition: background-color ${({theme}): string => theme.transition};
  display: flex;
  flex-direction: column;
  height: calc(100% - 2rem);
  min-height: 300px;
  position: relative;
  align-items: center;
  margin-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  grid-column: content-start/content-end;
  grid-template-rows: 2rem 1fr;
  grid-template-areas:
    'header header'
    'left right';

  .inner {
    display: grid;
    height: 100%;
    width: 100%;
    padding: 2.5rem 2rem 2rem 2rem;
  }
`

export default StyledBaseModule
