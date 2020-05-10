import styled from 'styled-components'

const StyledBaseModule = styled.div`
  display: grid;
  min-height: 300px;
  position: relative;
  align-items: center;
  margin-top: 2rem;
  grid-column: content-start/content-end;

  h3 {
    font-weight: 700;
    align-self: flex-start;
    margin: 0;
    top: -2rem;
    font-size: 4rem;
    position: relative;
    padding: 0 2rem;

    ${({theme}): string => theme.mobileM`
     font-size: 2rem;
     top: -1rem;
     padding: 0 1rem;
   `}
  }
`

export default StyledBaseModule
