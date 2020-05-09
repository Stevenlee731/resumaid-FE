import styled from 'styled-components'

const StyledBasics = styled.div`
  display: grid;
  min-height: 80vh;
  position: relative;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-items: center;
  grid-column: content-start/content-end;

  .left {
    .button-group {
      padding: 2rem 0;
    }
    a {
      background-color: ${props => props.theme.secondary};
      color: ${props => props.theme.primary};
      padding: 10px 15px;
      border-radius: 10px;
      text-transform: uppercase;
      font-weight: bold;
    }

    a + a {
      margin-left: 10px;
    }
  }

  summary {
    color: #868893;
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > * {
    color: white;
    z-index: 1;
  }

  h1 {
    font-size: 6rem;
    margin: 0;
  }

  > div {
    grid-column: span 2;
  }
`

export default StyledBasics
