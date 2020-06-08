import * as React from 'react'
import NestedFieldArray from './NestedFieldArray'
import isPlainObject from 'lodash.isplainobject'
import styled from 'styled-components'
import {
  StyledFormModuleInputContainer,
  StyledFormModuleInput,
  StyledFormModuleInputWrapper,
} from './Form'
import {CloseSVG} from '../../assets/svg'

const StyledFieldsCloseButton = styled.button`
  border-radius: 0 0.375rem 0.375rem 0;
  width: 1.5rem;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 1rem;
    width: 1rem;
  }
  &:hover {
    background: red;
    path {
      transition: all 0.3s ease-in-out;
      fill: #fff;
    }
  }

  path {
    transition: all 0.3s ease-in-out;
  }
`

const StyledFields = styled.li`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr auto;
  border: 1px solid #d2d6dc;
  border-radius: 0.375rem;
`

const StyledFieldsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  padding: 1rem 0 1rem 1rem;
`

const Fields = ({
  item,
  index,
  register,
  remove,
  inputObj,
  control,
  module,
}: {
  item: any
  index: number
  register: Function
  remove: (index?: number | number[] | undefined) => void
  inputObj: {}
  control: any
  module: string
}) => {
  return (
    <StyledFields>
      <StyledFieldsList>
        {Object.entries(inputObj).map(([propertyName, value]: any) => {
          if (Array.isArray(value)) {
            return (
              <NestedFieldArray
                key={propertyName}
                nestIndex={index}
                hasMultiple={Array.isArray(value)}
                {...{control, register, propertyName, item, value}}
              />
            )
          } else {
            return (
              <StyledFormModuleInputContainer
                key={propertyName}
                className="form-input"
              >
                <label>{propertyName}</label>
                {isPlainObject(value) ? (
                  Object.entries(value).map(([nestedKey, nestedValue]) => {
                    return (
                      <StyledFormModuleInputWrapper key={nestedKey}>
                        <StyledFormModuleInput
                          name={`content[${index}].${propertyName}.${nestedKey}`}
                          defaultValue={`${
                            item[propertyName][nestedKey] ?? ''
                          }`} // make sure to set up defaultValue
                          ref={register()}
                        />
                      </StyledFormModuleInputWrapper>
                    )
                  })
                ) : (
                  <StyledFormModuleInputWrapper>
                    <StyledFormModuleInput
                      name={`content[${index}].${propertyName}`}
                      defaultValue={`${item[propertyName] ?? ''}`} // make sure to set up defaultValue
                      ref={register()}
                    />
                  </StyledFormModuleInputWrapper>
                )}
              </StyledFormModuleInputContainer>
            )
          }
        })}
      </StyledFieldsList>
      {module !== 'basics' && (
        <StyledFieldsCloseButton type="button" onClick={() => remove(index)}>
          <CloseSVG />
        </StyledFieldsCloseButton>
      )}
    </StyledFields>
  )
}

export default Fields
