import React, {useState} from 'react'
import {useForm, useFieldArray} from 'react-hook-form'
import StyledButton from '../styles/StyledButton'
import {Chevron} from '../assets/svg'
import {BaseModuleProps} from '../types'
import {formatDataForGraphQL} from '../util/helpers'
import isPlainObject from 'lodash.isplainobject'

const NestedFieldArray = (props: any) => {
  const {
    nestIndex,
    control,
    register,
    propertyName,
    item,
    value,
    hasMultiple,
  } = props
  const {fields, remove, append} = useFieldArray({
    control,
    name: `content[${nestIndex}].${propertyName}`,
  })

  return (
    <li>
      <label>{propertyName}</label>
      {fields.map((item, k) => {
        return (
          <ul key={propertyName + k} style={{marginLeft: 20}}>
            {Object.entries(value[0]).map(([nestedKey, value]: any) => {
              return (
                <li key={`${nestedKey}-${k}`}>
                  <label>{nestedKey}</label>
                  <input
                    name={`content[${nestIndex}].${propertyName}[${k}].${nestedKey}`}
                    ref={register()}
                    defaultValue={item[nestedKey] ?? ''}
                    style={{marginRight: '25px'}}
                  />
                </li>
              )
            })}
            <button type="button" onClick={() => remove(k)}>
              Delete
            </button>
          </ul>
        )
      })}
      <button type="button" onClick={() => append(value[0])}>
        {`Add ${propertyName}`}
      </button>
    </li>
  )
}

const Fields = ({
  item,
  index,
  register,
  remove,
  inputObj,
  control,
}: {
  item: any
  index: number
  register: Function
  remove: (index?: number | number[] | undefined) => void
  inputObj: {}
  control: any
}) => {
  return (
    <>
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
            <li key={propertyName}>
              <label>{propertyName}</label>
              {isPlainObject(value) ? (
                Object.entries(value).map(([nestedKey, nestedValue]) => {
                  return (
                    <input
                      key={nestedKey}
                      name={`content[${index}].${propertyName}.${nestedKey}`}
                      defaultValue={`${nestedValue ?? ''}`} // make sure to set up defaultValue
                      ref={register()}
                    />
                  )
                })
              ) : (
                <input
                  name={`content[${index}].${propertyName}`}
                  defaultValue={`${item[propertyName] ?? ''}`} // make sure to set up defaultValue
                  ref={register()}
                />
              )}
            </li>
          )
        }
      })}
      <button type="button" onClick={() => remove(index)}>
        Delete
      </button>
    </>
  )
}

function Form({
  id,
  initialData,
  updateUser,
  module,
  inputObj,
}: {
  id: string
  initialData: BaseModuleProps
  updateUser: Function
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
    const formatted = content.filter(
      (input: {[s: string]: unknown} | ArrayLike<unknown>) => {
        return Object.values(input).some(prop => prop)
      },
    )

    const mutation = await updateUser({
      variables: {
        id,
        data: {
          [module]: {
            create: {
              order: parseInt(order),
              module,
              slot,
              content: {create: formatDataForGraphQL(formatted)},
            },
          },
        },
      },
    })

    console.log(mutation, 'mutation response')
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>{module}</h3>
        <StyledButton onClick={(e: any): void => handleClose(e)}>
          <Chevron direction={isOpen ? 'up' : 'down'} />
        </StyledButton>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>
            <li>
              <label>Order</label>
              <input
                name={'order'}
                defaultValue={order || '1'}
                ref={register()}
              />
            </li>
            <li>
              <label>slot</label>
              <input
                name={'slot'}
                defaultValue={slot || 'main'}
                ref={register()}
              />
            </li>
            {fields.map((item, index) => {
              return (
                <Fields
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
          </ul>
          <section>
            <button
              type="button"
              onClick={() => {
                append(inputObj)
              }}
            >
              append
            </button>

            <button
              type="button"
              onClick={() =>
                reset({
                  content,
                })
              }
            >
              reset
            </button>
          </section>
          <input type="submit" />
        </form>
      )}
    </div>
  )
}

export default Form
