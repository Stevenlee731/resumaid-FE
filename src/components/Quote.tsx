import * as React from 'react'
import {StyledQuote} from '../styles/References'

const Quote = ({quote}: {quote: string}): JSX.Element => {
  return <StyledQuote>{quote}</StyledQuote>
}

export default Quote
