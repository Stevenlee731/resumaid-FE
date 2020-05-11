import styled from 'styled-components'
import StyledBaseModule from './StyledBaseModule'

const StyledBasics = styled(StyledBaseModule)`
  grid-template-rows: 1fr;
  margin-top: 0;
  padding: 0;
  .headline {
    display: flex;
    align-items: center;
  }

  .info {
    display: flex;

    .social-icon + .social-icon {
      margin-left: 10px;
    }

    ${({theme}): string => theme.mobileM`
      flex-direction: column;
   `}
  }

  summary {
    margin: 1rem 2rem;
    color: ${({theme}): string => theme.textLight};
    line-height: 1.5;
    font-size: 1rem;

    ${({theme}): string => theme.mobileM`
      margin: 1rem 0;
   `}
  }

  h1 {
    font-size: 5rem;
    margin: 0;
    font-weight: 700;

    ${({theme}): string => theme.mobileM`
      font-size: 3rem;
      margin-bottom: 1rem;
   `}
  }

  h2 {
    font-weight: 400;
  }

  > div {
    grid-column: span 2;
  }

  .period {
    color: ${({theme}): string => theme.primary};
  }
`

export default StyledBasics
