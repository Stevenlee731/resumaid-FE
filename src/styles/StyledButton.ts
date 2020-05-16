import styled from 'styled-components'

const StyledButton = styled.button`
  height: 2rem;
  width: 2rem;
  background: transparent;
  padding: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 100%;
    width: 100%;
  }
  path {
    fill: ${({theme}) => theme.textLight};
  }
`

export default StyledButton
