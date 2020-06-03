import React, {useState} from 'react'
import {useForm, useFieldArray} from 'react-hook-form'
import StyledButton from '../styles/StyledButton'
import {Chevron} from '../assets/svg'
import {BaseModuleProps} from '../types'
import {formatDataForGraphQL} from '../util/helpers'
import isObject from 'lodash.isobject'

const NestedFieldArray = (props: any) => {
  const {nestIndex, control, register, propertyName, item, value} = props
  const {fields, remove, append} = useFieldArray({
    control,
    name: `content[${nestIndex}].${propertyName}`,
  })

  console.log(fields, 'nested fields')
  console.log(item, 'nested item')
  console.log(value, 'nested value')
  return (
    <div>
      {fields.map((item, k) => {
        const nestedItems = []

        for (let [nestedKey, val] of Object.entries<any>(value[0])) {
          console.log(`${nestedKey}: ${val}`, 'steve')

          nestedItems.push(
            <input
              key={nestedKey}
              name={`content[${nestIndex}].${propertyName}[${k}].${nestedKey}`}
              ref={register()}
              defaultValue={item[nestedKey]}
              style={{marginRight: '25px'}}
            />,
          )
        }

        return (
          <div key={item.id} style={{marginLeft: 20}}>
            {nestedItems}
            <button type="button" onClick={() => remove(k)}>
              Delete
            </button>
          </div>
        )
      })}

      <button type="button" onClick={() => append(value[0])}>
        {`Add ${propertyName}`}
      </button>
    </div>
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
  const items = []

  for (let [propertyName, value] of Object.entries<any>(inputObj)) {
    console.log(`${propertyName}: ${value}`, 'steve')

    if (isObject(value)) {
      items.push(
        <NestedFieldArray
          key={propertyName}
          nestIndex={index}
          {...{control, register, propertyName, item, value}}
        />,
      )
    } else {
      items.push(
        <input
          key={propertyName}
          name={`content[${index}].${propertyName}`}
          defaultValue={`${item[propertyName]}`} // make sure to set up defaultValue
          ref={register()}
        />,
      )
    }
  }

  return (
    <li>
      {items}
      <button type="button" onClick={() => remove(index)}>
        Delete
      </button>
    </li>
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

    console.log(formatted, 'formatted')

    const x = formatDataForGraphQL(formatted)

    console.log(x, 'final')

    const mutation = await updateUser({
      variables: {
        id,
        data: {
          [module]: {
            create: {
              order: parseInt(order),
              module,
              slot,
              content: {create: x},
            },
          },
        },
      },
    })

    console.log(mutation, 'mutation response')
  }

  console.log(fields, 'fields')

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h3>{module}</h3>
        <StyledButton onClick={(e: any): void => handleClose(e)}>
          <Chevron direction={isOpen ? 'up' : 'down'} />
        </StyledButton>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Order</label>
          <input name={'order'} defaultValue={order || '1'} ref={register()} />
          <label>slot</label>
          <input name={'slot'} defaultValue={slot || 'main'} ref={register()} />
          <ul>
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
