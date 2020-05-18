import * as React from 'react'
import {ReferencesProps, ReferencesModuleProps} from '../types'
import Quote from '../components/Quote'
import Reference from '../components/Reference'
import {StyledReferences} from '../styles/References'
import {StyledSectionHeader} from '../styles/Section'

const References: React.FC<ReferencesModuleProps> = (props): JSX.Element => {
  const {content, background, slot} = props

  const [reference, setReference] = React.useState<ReferencesProps | null>(
    content && content[0] ? content[0] : null,
  )

  const handleClick = (reference: ReferencesProps): void => {
    setReference(reference)
  }

  return (
    <StyledReferences slot={slot} background={background}>
      <StyledSectionHeader slot={slot}>References</StyledSectionHeader>
      <div className="inner">
        {reference?.reference && <Quote quote={reference?.reference} />}
        {content && (
          <div className="reference-group">
            {content.map(item => {
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
