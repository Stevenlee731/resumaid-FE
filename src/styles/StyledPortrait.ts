import styled from 'styled-components'

const StyledPortrait = styled.picture`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: span 2;
  border-radius: 50%;

  > img {
    border-radius: 50%;
    height: 80%;
    width: 80%;
    border: 4px solid ${props => props.theme.secondary};
  }
`

export default StyledPortrait
