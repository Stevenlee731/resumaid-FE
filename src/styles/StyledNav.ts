import styled from 'styled-components'

const StyledNav = styled.nav`
  display: block;
  background: ${({theme}): string => theme.nav};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  .outer-container {
    padding: 0 2rem;
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

  .logo {
    flex-shrink: 0;
    width: min-content;

    a {
      word-spacing: 9999px;
      color: black;
      text-align: left;
      font-weight: 700;
    }
  }

  .outer-directory {
    display: block;
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
`

export default StyledNav
