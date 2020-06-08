import * as React from 'react'
import {useFieldArray} from 'react-hook-form'
import {CloseSVG, AddSVG} from '../../assets/svg'
import {StyledFormModuleInput, StyledFormModuleInputWrapper} from './Form'
import styled from 'styled-components'

const StyledNestedFieldsCloseButton = styled.button`
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
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

const StyledNestedFormListItem = styled.li`
  display: flex;
  flex-direction: column;
`

const StyledNestedFormUnorderedList = styled.ul`
  display: grid;
  grid-row-gap: 1rem;
`

const StyledNestedFormList = styled.div`
  width: 100%;
  justify-content: space-between;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;
  align-items: center;
  padding-left: 1rem;
`

const StyledNestedFormAddButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  margin-left: 1rem;

  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 1rem;
    width: 1rem;
  }
  &:hover {
    background: green;
    path {
      transition: all 0.3s ease-in-out;
      fill: #fff;
    }
  }

  path {
    transition: all 0.3s ease-in-out;
  }
`

const StyledNestedFormHeader = styled.section`
  display: flex;
  align-items: center;
`

const StyledNestedFormInput = styled.li`
  flex-basis: 100%;
  grid-column: span 2;
  display: grid;
  grid-row-gap: 1rem;

  > div + div {
    margin-top: 1rem;
  }
`

const NestedFieldArray = (props: any) => {
  const {nestIndex, control, register, propertyName, value} = props
  const {fields, remove, append} = useFieldArray({
    control,
    name: `content[${nestIndex}].${propertyName}`,
  })

  return (
    <StyledNestedFormInput>
      <StyledNestedFormHeader>
        <label>{propertyName}</label>
        <StyledNestedFormAddButton
          type="button"
          onClick={() => append(value[0])}
        >
          <AddSVG />
        </StyledNestedFormAddButton>
      </StyledNestedFormHeader>

      {fields.map((item, k) => {
        return (
          <StyledNestedFormList key={propertyName + k}>
            <StyledNestedFormUnorderedList>
              {Object.entries(value[0]).map(([nestedKey, value]: any) => {
                return (
                  <StyledNestedFormListItem key={`${nestedKey}-${k}`}>
                    <StyledFormModuleInput
                      name={`content[${nestIndex}].${propertyName}[${k}].${nestedKey}`}
                      ref={register()}
                      placeholder={nestedKey}
                      defaultValue={item[nestedKey] ?? ''}
                    />
                  </StyledNestedFormListItem>
                )
              })}
            </StyledNestedFormUnorderedList>
            <StyledNestedFieldsCloseButton
              type="button"
              onClick={() => remove(k)}
            >
              <CloseSVG />
            </StyledNestedFieldsCloseButton>
          </StyledNestedFormList>
        )
      })}
    </StyledNestedFormInput>
  )
}

export default NestedFieldArray
