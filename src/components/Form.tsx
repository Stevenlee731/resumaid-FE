import React, {useState} from 'react'
import {useForm, useFieldArray} from 'react-hook-form'
import StyledButton from '../styles/StyledButton'
import {Chevron} from '../assets/svg'
import {BaseModuleProps} from '../types'

const Fields = ({
  item,
  index,
  register,
  remove,
  inputObj,
}: {
  item: any
  index: number
  register: Function
  remove: (index?: number | number[] | undefined) => void
  inputObj: {}
}) => {
  return (
    <li key={item.id}>
      {inputObj &&
        Object.keys(inputObj).map(input => {
          console.log(inputObj, 'asdasd')
          return (
            <input
              key={input}
              name={`content[${index}].${input}`}
              defaultValue={`${item[input]}`} // make sure to set up defaultValue
              ref={register()}
            />
          )
        })}
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

  console.log(fields, 'fields')

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
              content: {create: formatted},
            },
          },
        },
      },
    })
  }

  console.log(inputObj, 'obj')
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
