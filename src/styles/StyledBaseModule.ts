import styled from 'styled-components'

const StyledBaseModule = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 2rem);
  min-height: 300px;
  position: relative;
  align-items: center;
  margin-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  grid-column: content-start/content-end;
  grid-template-rows: 2rem 1fr;
  grid-template-areas:
    'header header'
    'left right';

  h3 {
    grid-area: header;
    font-weight: 700;
    align-self: flex-start;
    margin: 0;
    top: -2rem;
    font-size: 4rem;
    position: absolute;
    padding: 0 2rem;

    ${({theme}): string => theme.mobileM`
     font-size: 2rem;
     top: -1rem;
     padding: 0 1rem;
   `}
  }

  .inner {
    display: grid;
    height: 100%;
    width: 100%;
    padding: 2rem;
  }
`

export default StyledBaseModule
