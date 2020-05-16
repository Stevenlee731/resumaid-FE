import styled from 'styled-components'
import SidebarSection from '../components/Sidebar/SidebarSection'

export const StyledMainSection = styled.section`
  display: grid;
  overflow-x: hidden;
`

export const StyledSidebarSection = styled.div`
  padding: 0.5rem 1rem;
  .header {
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export const StyledSidebarWrapper = styled.div`
  border-radius: 1rem;
  border: ${({theme}): string => `2px solid ${theme.border}`};
  transition: border ${({theme}): string => theme.transition};

  > div + div {
    border-top: ${({theme}): string => `2px solid ${theme.border}`};
    transition: border-top ${({theme}): string => theme.transition};
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
