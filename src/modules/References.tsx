import * as React from 'react'
import {ReferencesProps, ReferencesModuleProps} from '../types'
import Quote from '../components/Quote'
import Reference from '../components/Reference'
import {StyledReferences} from '../styles/References'
import {StyledSectionHeader} from '../styles/Section'

const References: React.FC<ReferencesModuleProps> = (props): JSX.Element => {
  const {data, background} = props

  const [reference, setReference] = React.useState<ReferencesProps | null>(
    data && data[0] ? data[0] : null,
  )

  const handleClick = (reference: ReferencesProps): void => {
    setReference(reference)
  }

  return (
    <StyledReferences background={background}>
      <StyledSectionHeader>References</StyledSectionHeader>
      <div className="inner">
        {reference?.reference && <Quote quote={reference?.reference} />}
        {data && (
          <div className="reference-group">
            {data.map(item => {
              return (
                <Reference
                  key={item.name}
                  handleClick={handleClick}
                  referrer={item}
                />
              )
            })}
          </div>
        )}
      </div>
    </StyledReferences>
  )
}

export default References
