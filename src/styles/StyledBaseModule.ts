import styled from 'styled-components'
import {StyledBaseModuleProps} from '../types'

const StyledBaseModule = styled.div<StyledBaseModuleProps>`
  border-radius: 1rem;
  background-color: ${({theme, background, slot}): string =>
    slot === 'main' ? theme[background] : 'initial'};
  transition: background-color ${({theme}): string => theme.transition};
  display: flex;
  flex-direction: column;
  height: calc(100% - 2rem);
  position: relative;
  align-items: center;
  margin-top: ${({slot}): string => (slot === 'main' ? '2rem' : '.5rem')};
  margin-bottom: ${({slot}): string => (slot === 'main' ? '0' : '.5rem')};
  padding-left: ${({slot}): string => (slot === 'main' ? '2rem' : 'initial')};
  padding-right: ${({slot}): string => (slot === 'main' ? '2rem' : 'initial')};
  grid-template-rows: 2rem 1fr;
  grid-template-areas:
    'header header'
    'left right';

  h3 {
    display: ${({slot}): string => (slot === 'main' ? 'block' : 'none')};
  }

  .inner {
    display: grid;
    height: 100%;
    width: 100%;
    padding: ${({slot}): string =>
      slot === 'main' ? '2.5rem 2rem 2rem 2rem' : '0'};

    ${({theme}): string => theme.mobileM`
      padding: 1.5rem 1rem 1rem 1rem;
    `};
  }

  ${({theme}): string => theme.mobileM`
      padding-left: 1rem;
      padding-right: 1rem;
    `};
`

export default StyledBaseModule
