import styled from 'styled-components'

export const StyledNav = styled.nav`
  display: block;
  height: 4rem;
  transition: background-color ${({theme}): string => theme.transition};
  background: ${({theme}): string => theme.nav};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  grid-area: header;
  z-index: 9999;
  position: sticky;
  top: 0;

  .outer-container {
    max-width: ${({theme}): string => theme.maxWidth};
    margin-left: auto;
    margin-right: auto;
  }
  .inner-container {
    height: 4rem;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }

  .nav-left {
    display: flex;
    align-items: center;
  }

  .nav-right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dark-mode {
    padding-right: 1rem;
    color: ${({theme}): string => theme.textLight};
  }

  .logo {
    flex-shrink: 0;
    width: min-content;

    a {
      display: flex;
      align-items: center;
      color: ${({theme}): string => theme.textDark};
      word-spacing: 9999px;
      text-align: left;
      font-weight: 700;
    }

    span {
      margin-left: 0.5rem;
    }
  }

  .outer-directory {
    display: block;

    ${({theme}): string => theme.mobileM`
      display: none;
    `};
  }

  .inner-directory {
    margin-left: 2.5rem;

    > a {
      text-transform: capitalize;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      border-radius: 0.375rem;
      color: ${({theme}): string => theme.textLight};
    }
  }

  ${({theme}): string => theme.mobileL`
    .outer-container {
      padding: 0 20px;
    }
  `}
`

export const StyledNavSection = styled.div`
  padding-left: 1.5rem;
  display: flex;
  align-items: center;
`
