import styled from 'styled-components'
import StyledBaseModule from './StyledBaseModule'

const StyledBasics = styled(StyledBaseModule)`
  grid-template-rows: 1fr;
  margin-top: 0;
  padding: 0;
  grid-area: subheader;
  .headline {
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: 5rem;
    margin: 0;
    font-weight: 700;

    ${({theme}): string => theme.mobileM`
      font-size: 3rem;
   `}
  }

  h2 {
    font-weight: 400;
  }

  > div {
    grid-column: span 2;
  }

  .period {
    transition: all ${({theme}): string => theme.transition};
    color: ${({theme}): string => theme.primary};
  }

  ${({theme}): string => theme.mobileM`
    margin-top: 1rem;
  `};
`

export default StyledBasics
