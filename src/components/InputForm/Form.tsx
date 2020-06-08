import React, {useState} from 'react'
import {useForm, useFieldArray} from 'react-hook-form'
import StyledButton from '../../styles/StyledButton'
import {Chevron} from '../../assets/svg'
import {BaseModuleProps} from '../../types'
import {formatDataForGraphQL} from '../../util/helpers'
import styled from 'styled-components'
import Fields from './Fields'

export const StyledFormModuleInputWrapper = styled.div`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  margin-top: 0.25rem;
  border-radius: 0.375rem;
  border: 0 solid #d2d6dc;
`

export const StyledFormModuleInput = styled.input`
  display: block;
  line-height: 1.25rem;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-color: #d2d6dc;
  border-width: 1px;
  border-radius: 0.375rem;
`

export const StyledFormModuleSelect = styled.select`
  display: block;
  line-height: 1.25rem;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-color: #d2d6dc;
  border-width: 1px;
  border-radius: 0.375rem;
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  -moz-appearance: none;
`

const StyledFormModuleList = styled.ul`
  display: grid;
  grid-row-gap: 1rem;
`

export const StyledFormModuleInputContainer = styled.li`
  flex-basis: 49%;
  display: flex;
  flex-direction: column;
`

const StyledFormModuleBaseGroup = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
`

const StyledFormModuleButton = styled.div<{hoverColor: string}>`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 0.375rem;

  > button {
    transition-duration: 0.15s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    line-height: 1.5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-radius: 0.375rem;

    &:hover {
      background: ${({hoverColor}) => hoverColor};
      border-color: ${({hoverColor}) => hoverColor};
      color: #fff;
    }
  }
`

const StyledFormModuleFooter = styled.div`
  display: flex;
  margin: 1rem 0;

  > div + div {
    padding-left: 1rem;
  }
`

const StyledFormModuleForm = styled.form`
  display: block;
`

const StyledFormModuleName = styled.h3`
  color: ${({theme}) => theme.background};
  text-transform: capitalize;
`

const StyledFormModuleToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledFormModule = styled.li`
  position: relative;
  padding: 0 1rem;

  border-color: #d2d6dc;
  border-width: 1px;
  border-radius: 1rem;

  label {
    color: ${({theme}) => theme.background};
    text-transform: capitalize;
  }
`

function Form({
  id,
  initialData,
  updateUser,
  updateUserData,
  module,
  inputObj,
}: {
  id: string
  initialData: BaseModuleProps
  updateUser: Function
  updateUserData: {loading: any; data: any; error: any}
  module: string
  inputObj: {}
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const {content, order, slot} = initialData

  const {register, control, handleSubmit, reset} = useForm({
    defaultValues: {
      content: content ? content : [inputObj],
    },
  })

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'content',
  })

  const onSubmit = async (data: any) => {
    const {content, order, slot} = data

    const formatted =
      content &&
      formatDataForGraphQL(
        content.filter((input: {[s: string]: unknown} | ArrayLike<unknown>) => {
          return Object.values(input).some(prop => prop)
        }),
      )

    const mutation = await updateUser({
      variables: {
        id,
        data: {
          [module]: {
            create:
              module === 'basics'
                ? formatted[0]
                : {
                    order: parseInt(order),
                    module,
                    slot,
                    content: {create: formatted ?? []},
                  },
          },
        },
      },
    })

    console.log(mutation, 'mutation response')
  }

  return (
    <StyledFormModule>
      <StyledFormModuleToggle>
        <StyledFormModuleName>{module}</StyledFormModuleName>
        <StyledButton onClick={(e: any): void => handleClose(e)}>
          <Chevron direction={isOpen ? 'up' : 'down'} />
        </StyledButton>
      </StyledFormModuleToggle>

      {isOpen && (
        <StyledFormModuleForm onSubmit={handleSubmit(onSubmit)}>
          <StyledFormModuleList>
            {module !== 'basics' && (
              <StyledFormModuleBaseGroup>
                <StyledFormModuleInputContainer>
                  <label>Order</label>

                  <StyledFormModuleInputWrapper>
                    <StyledFormModuleSelect
                      className="reactSelect"
                      name={'order'}
                      placeholder="Order"
                      ref={register}
                      defaultValue={order || '1'}
                    >
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                      <option value="5">Five</option>
                      <option value="6">Six</option>
                    </StyledFormModuleSelect>
                  </StyledFormModuleInputWrapper>
                </StyledFormModuleInputContainer>
                <StyledFormModuleInputContainer>
                  <label>slot</label>

                  <StyledFormModuleInputWrapper>
                    <StyledFormModuleSelect
                      className="reactSelect"
                      name="slot"
                      placeholder="Slot"
                      ref={register}
                      defaultValue={slot || 'main'}
                    >
                      <option value="main">Main</option>
                      <option value="sidebar">Sidebar</option>
                    </StyledFormModuleSelect>
                  </StyledFormModuleInputWrapper>
                </StyledFormModuleInputContainer>
              </StyledFormModuleBaseGroup>
            )}
            {fields.map((item, index) => {
              return (
                <Fields
                  module={module}
                  control={control}
                  key={item.id}
                  item={item}
                  index={index}
                  register={register}
                  remove={remove}
                  inputObj={inputObj}
                />
              )
            })}
          </StyledFormModuleList>
          <StyledFormModuleFooter>
            {module !== 'basics' && (
              <StyledFormModuleButton hoverColor="green">
                <button
                  style={{}}
                  type="button"
                  onClick={() => {
                    append(inputObj)
                  }}
                >
                  {`Add ${module}`}
                </button>
              </StyledFormModuleButton>
            )}
            <StyledFormModuleButton hoverColor="red">
              <button
                type="button"
                onClick={() =>
                  reset({
                    content,
                  })
                }
              >
                Reset to last saved
              </button>
            </StyledFormModuleButton>
            <StyledFormModuleButton hoverColor="#0095f6">
              <button type="submit">
                {updateUserData.loading
                  ? 'Saving'
                  : updateUserData.error
                  ? 'Error'
                  : 'Save'}
              </button>
            </StyledFormModuleButton>
          </StyledFormModuleFooter>
        </StyledFormModuleForm>
      )}
    </StyledFormModule>
  )
}

export default Form
