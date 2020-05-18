import styled from 'styled-components'

const StyledFooter = styled.footer`
  height: 2rem;
  grid-area: footer;
  display: grid;
  align-items: center;

  border-top: 2px solid ${({theme}): string => theme.border};
  background-color: ${({theme}): string => theme.background};
  transition: all ${({theme}): string => theme.transition};
  color: ${({theme}): string => theme.textDark};
`

export default StyledFooter
