import styled from 'styled-components'

export const StyledNav = styled.nav`
  display: block;
  transition: all ${({theme}): string => theme.transition};
  background: ${({theme}): string => theme.nav};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  grid-area: header;

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
      color: ${({theme}): string => theme.textDark};
      word-spacing: 9999px;
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

export const StyledToggle = styled.span`
  position: relative;
  display: flex;
  width: 2rem;
  height: 1rem;
  background-color: ${({theme}): string => theme.primary};
  color: #000;
  border: 1px solid ${({theme}): string => theme.secondary};
  transition: all ${({theme}): string => theme.transition};

  &.off,
  &.on {
    border-radius: 1rem;
    padding: 5px;
    cursor: pointer;
  }

  &.off:before,
  &.off:after {
    transition: all ${({theme}): string => theme.transition};
  }

  &.on:before,
  &.on:after {
    transition: all ${({theme}): string => theme.transition};
  }

  &.off:before,
  &.on:before {
    position: absolute;
    content: '';
    height: 1rem;
    width: 1rem;
    left: 4px;
    top: 5px;
    background-color: ${({theme}): string => theme.secondary};
    transition: all ${({theme}): string => theme.transition};
    border-radius: 50%;
    box-shadow: inset -8px -8px 6px -6px ${({theme}): string => theme.secondary};
  }

  &.off:after {
    display: block;
    position: absolute;
    content: '';
    transform: rotate(-270deg);
    left: 17px;
    top: 15px;
  }

  &.on:before {
    transform: translateX(1rem);
  }

  &.on:after {
    position: absolute;
    content: '';
    -o-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    left: 56px;
    top: 15px;
  }
`
