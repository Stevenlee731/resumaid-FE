import styled from 'styled-components'

const StyledPortrait = styled.picture`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  > img {
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
    border: 2px solid ${props => props.theme.secondary};
  }
`

export default StyledPortrait
