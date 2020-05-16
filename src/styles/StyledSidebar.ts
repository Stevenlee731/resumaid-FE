import styled from 'styled-components'

const StyledSidebar = styled.aside`
  display: grid;
  flex-direction: column;
  grid-area: sidebar;
  height: fit-content;
  grid-row-gap: 1rem;

  .social-icon + .social-icon {
    margin-left: 10px;
  }

  ${({theme}): string => theme.mobileM`
      flex-direction: column;
      display: none
   `}
`

export default StyledSidebar
