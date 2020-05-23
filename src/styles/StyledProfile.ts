import styled from 'styled-components'

const StyledProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  padding: 1rem;

  h4 {
    margin: 0;
    font-weight: 400;
  }

  .button-group {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 1rem;
    > a {
      background-color: ${({theme}): string => theme.primary};
      color: ${({theme}): string => theme.textLight};
      padding: 10px 15px;
      border-radius: 10px;
      text-transform: uppercase;
      font-weight: bold;
    }
  }

  summary {
    margin-top: 1rem;
    transition: all ${({theme}): string => theme.transition};
    color: ${({theme}): string => theme.textLight};
    line-height: 1.5;
    font-size: 1rem;
  }

  ${({theme}): string => theme.mobileM`
      margin-bottom: 0;
   `}
`
export default StyledProfile
