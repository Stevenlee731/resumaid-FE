import styled from 'styled-components'
import SidebarSection from '../components/SidebarSection'

export const StyledMainSection = styled.section`
  display: grid;
  overflow-x: hidden;
`

export const StyledSidebarSection = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  border: ${({theme}): string => `1px solid ${theme.border}`};
  transition: border ${({theme}): string => theme.transition};

  .header {
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export const StyledSectionHeader = styled.h3`
  font-size: ${({slot}): string => (slot === 'main' ? '4rem' : '1.5rem')};
  grid-area: header;
  font-weight: 700;
  align-self: flex-start;
  margin: 0;
  top: ${({slot}): string => (slot === 'main' ? '-2rem' : 'initial')};
  position: ${({slot}): string => (slot === 'main' ? 'absolute' : 'relative')};

  ${({theme}): string => theme.mobileM`
     font-size: 2rem;
     top: -1rem;
   `}
`

export const StyledContentWrapper = styled.main`
  grid-area: content;
  display: grid;
  grid-row-gap: 2rem;

  ${({theme}): string => theme.mobileM`
    grid-row-gap: 1rem;
  `}
`
