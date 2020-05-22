import styled from 'styled-components'

export const StyledCenteredContainer = styled.div`
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    padding-right: 1rem;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-radius: 1rem;
    padding: 0.375rem 0.75rem;
    border: 1px solid ${({theme}): string => theme.textDark};
  }

  a {
    color: ${({theme}): string => theme.textDark};
    /* transition: all ${({theme}): string => theme.transition}; */
  }
`

export const StyledToggle = styled.span`
  position: relative;
  display: flex;
  width: 2rem;
  height: 1rem;
  min-width: 2rem;
  background-color: ${({theme}): string => theme.siteSecondary};
  color: #000;
  border: 1px solid ${({theme}): string => theme.secondary};
  transition: all ${({theme}): string => theme.transition};
  box-sizing: initial;

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
    background-color: #fff;
    transition: all ${({theme}): string => theme.transition};
    border-radius: 50%;
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

export const StyledButton = styled.div<{inverted: boolean}>`
  box-shadow: ${({theme}): string => theme.boxShadow};
  border-radius: 0.375rem;
  margin: 0 0.5rem;

  > a {
    padding: 1rem 2.5rem;
    font-size: 1.125rem;
    transition-duration: 0.15s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-radius: 0.375rem;
    border-color: transparent;
    background-color: ${({theme, inverted}): string =>
      inverted ? theme.textLight : theme.sitePrimary};
    color: #fff;
    font-weight: 700;
  }
`

export const StyledDropdown = styled.div<{isDropdownOpen: boolean}>`
  text-align: left;
  position: relative;
  display: inline-block;

  .dropdown {
    width: 100%;
    padding: 0.5rem;
    line-height: 1.25rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: ${({theme}): string => theme.textDark};
    border-radius: ${({isDropdownOpen}): string =>
      isDropdownOpen ? '0' : '50%'};
    transition: border-radius 0.6s;
    border: 0;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: ${({theme}): string => theme.background};
  }

  .popup {
    transform-origin: top right;
    width: auto;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    position: absolute;
    margin-top: 0.5rem;
    border-radius: 0.375rem;
    right: 0;
    z-index: 1000;
  }

  .outer-popup {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
    background-color: ${({theme}): string => theme.textDark};
    border-radius: 0.375rem;
  }

  .inner-popup {
    padding: 0.25rem 0;
    display: flex;
    flex-direction: column;
    height: auto;
    align-items: flex-start;

    .signin,
    a {
      text-align: left;
      padding: 0.5rem 1rem;
      line-height: 1.25rem;
      color: ${({theme}): string => theme.background};
      display: block;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({theme}): string => theme.background};
      padding: 0.5rem 1rem;
    }

    .dark-mode {
      white-space: nowrap;
      color: ${({theme}): string => theme.background};
    }
  }
`

export const StyledWave = styled.svg`
  position: absolute;
  bottom: 0;

  path {
    fill: ${({theme}): string => theme.sitePrimary};
  }
/* 
  ${({theme}): string => theme.mobileL`
    height: 50%;
  `}; */
`
