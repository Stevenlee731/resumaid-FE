import styled from 'styled-components'

const StyledSection = styled.section`
  display: grid;
  overflow-x: hidden;
  grid-template-columns:
    [viewport-start] minmax(20px, 1fr) [content-start] minmax(0, 80rem)
    [content-end] minmax(20px, 1fr) [viewport-end];
`

export default StyledSection
