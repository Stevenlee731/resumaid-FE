import styled from 'styled-components'

export const StyledSection = styled.section`
  display: grid;
  overflow-x: hidden;
  grid-template-columns:
    [viewport-start] minmax(20px, 1fr) [content-start] minmax(0, 60rem)
    [content-end] minmax(20px, 1fr) [viewport-end];
`

export const StyledSectionHeader = styled.h3`
  grid-area: header;
  font-weight: 700;
  align-self: flex-start;
  margin: 0;
  top: -2rem;
  font-size: 4rem;
  position: absolute;

  ${({theme}): string => theme.mobileM`
     font-size: 2rem;
     top: -1rem;
   `}
`
