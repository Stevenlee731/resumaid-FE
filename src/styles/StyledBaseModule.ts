import styled from 'styled-components'

const StyledBaseModule = styled.div`
  display: grid;
  min-height: 400px;
  position: relative;
  align-items: center;
  margin-top: 4rem;
  grid-column: content-start/content-end;

  h3 {
    font-weight: 700;
    align-self: flex-start;
    margin: 0;
    top: -3rem;
    font-size: 100px;
    position: relative;
    padding: 0 2rem;
  }
`

export default StyledBaseModule
