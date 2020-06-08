import * as React from 'react'
import styled from 'styled-components'

const StyledFormMenu = styled.div<{open: boolean}>`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({theme}) => theme.invertedBackground};
  transform: ${({open}) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  text-align: left;
  padding-top: 2rem;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0d0c1d;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`

const FormMenu = ({open, children}: {open: boolean; children: JSX.Element}) => {
  return <StyledFormMenu open={open}>{children}</StyledFormMenu>
}

export default FormMenu
