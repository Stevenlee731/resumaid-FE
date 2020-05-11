import * as React from 'react'
import {StyledReference} from '../styles/References'
import {ReferencesProps} from '../types'

const Reference = ({
  referrer,
  handleClick,
}: {
  referrer: ReferencesProps
  handleClick: Function
}): JSX.Element => {
  return (
    <StyledReference
      onClick={(): void => handleClick(referrer)}
    >{`${referrer?.name}`}</StyledReference>
  )
}

export default Reference
