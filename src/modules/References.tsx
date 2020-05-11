import * as React from 'react'
import {ReferencesProps, ReferencesModuleProps} from '../types'
import StyledReferences from '../styles/StyledReferences'

const References: React.FC<ReferencesModuleProps> = (props): JSX.Element => {
  const {data, background, layout} = props
  return (
    <StyledReferences layout={layout} background={background}>
      <h3>References</h3>
      <div className="inner">inner</div>
    </StyledReferences>
  )
}

export default References
