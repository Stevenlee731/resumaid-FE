import styled from 'styled-components'

const StyledHome = styled.main`
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  .hero {
    text-align: center;
    font-size: 3rem;
    display: flex;
    flex-direction: column;
    font-weight: 700;
    margin-bottom: 10rem;

    span {
      display: block;
    }
  }

  .header {
    margin: 0;
  }

  .text-primary {
    color: ${({theme}): string => theme.textDark};
  }

  .text-secondary {
    color: ${({theme}): string => theme.primary};
  }

  .subheader {
    font-size: 1.5rem;
  }

  .button-group {
    display: flex;
    justify-content: center;
  }

  ${({theme}): string => theme.mobileXL`
    .hero {
      font-size: 1.5rem;
      margin-bottom: 3rem;
    }

    .subheader {
      font-size: 1rem;
    }

    .button-group {
      flex-direction: column;
      align-items: center;

      > div {
        width: 75%;
      }

      > * + * {
        margin-top: 0.5rem;
      }
    }
  `};
`

export default StyledHome
