import styled from 'styled-components'

const StyledSidebar = styled.aside`
  display: grid;
  flex-direction: column;
  grid-area: sidebar;
  height: fit-content;
  grid-row-gap: 1rem;

  summary {
    transition: all ${({theme}): string => theme.transition};
    color: ${({theme}): string => theme.textLight};
    line-height: 1.5;
    font-size: 1rem;

    ${({theme}): string => theme.mobileM`
      margin: 1rem 0;
   `}
  }

  .social-icon + .social-icon {
    margin-left: 10px;
  }

  ${({theme}): string => theme.mobileM`
      flex-direction: column;
      display: none
   `}
`

export default StyledSidebar
