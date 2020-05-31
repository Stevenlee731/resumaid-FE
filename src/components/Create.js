import {useLazyQuery, useMutation} from '@apollo/client'
import {Redirect, Link} from 'react-router-dom'
import React, {useCallback, useState} from 'react'
import {sendReparentableChild} from 'react-reparenting'
import {CURRENT_USER_QUERY} from '../graphql/Queries'
import StyledLayout from '../styles/StyledLayout'
import {useSafeUnMount} from '../util/hooks'
import Profile from '../modules/Profile'
import Basics from '../modules/Basics'
import {formatResumeData} from '../util/helpers'
import {useForm, useFieldArray, Controller} from 'react-hook-form'
import Form from './Form'

import Modules from './Modules'
import {StyledMainSection, StyledContentWrapper} from '../styles/Section'

import {Sidebar, SidebarSection, SidebarWrapper} from './Sidebar/index'

import {ModulesProps, ViewportInfoProps} from '../types'
import {ThumbsDown, Chevron} from '../assets/svg'
import styled, {ThemeConsumer} from 'styled-components'
import {MainLoader, SidebarLoader, SubheaderLoader} from '../components/Loaders'
import {
  StyledCenteredContainer,
  StyledButton,
  StyledForm,
  StyledInput,
} from '../styles/Components'
import {CREATE_BASIC, UPDATE_USER} from '../graphql/Mutations'

export function Child() {
  // // The state is manteined during reparenting.
  // const [state] = useState(() => Math.random().toFixed(10))

  // // Logs the component lificycle.
  // console.log('-- rendering the child')
  // useEffect(() => {
  //   // The component is mounted only one time.
  //   console.log('---- mounting the child')
  //   return () => {
  //     // The component is never unmounted during reparenting.
  //     console.log('------ unmounting the child')
  //   }
  // }, [])

  return <div className="child">Child</div>
}

// const changeParent = useCallback(() => {
//   setParent(parent => {
//     const newParent = parent === 'A' ? 'B' : 'A'
//     // The "send" method will also transfer the child DOM node.
//     // (You can disable this feature, and transfer it manually).
//     // send(parent, newParent, 0, 0) means that the first child of
//     // "parent" will become the first child of "newParent" (0 is the index).
//     // Try removing the send method and check what has changed in the console.
//     sendReparentableChild(parent, newParent, 0, 0)
//     // Return the new parent.
//     return newParent
//   })
// }, [])

export default function Create({isDark, handleTheme}) {
  const [parent, setParent] = useState('A')

  const {register, errors, handleSubmit} = useForm()
  const [getCurrentUser, {data, loading, error}] = useLazyQuery(
    CURRENT_USER_QUERY,
  )

  useSafeUnMount(getCurrentUser)

  const [
    updateUser,
    {
      data: createBasicData,
      loading: createBasicLoading,
      error: createBasicError,
    },
  ] = useMutation(UPDATE_USER)

  const children = {
    parentA: parent === 'A' ? [<Child key={'1'} />] : [],
    parentB: parent === 'B' ? [<Child key={'1'} />] : [],
  }

  if (loading) {
    return <div>Loading</div>
  }

  if (error || !data) {
    return <div>error</div>
  }

  const {authenticatedUser} = data || {}
  const {id} = authenticatedUser || {}

  const onSubmit = async ({name, city, label, website}) => {
    const basic = await updateUser({
      variables: {
        id,
        data: {
          basics: {create: {name, label, website, location: {create: {city}}}},
        },
      },
    })
    console.log(basic, 'basic')
  }

  if (!authenticatedUser) {
    return (
      <StyledCenteredContainer>
        <div style={{marginBottom: '20%'}}>
          <h2>We need to sign you up first!</h2>
          <div className="button-group">
            <StyledButton inverted={true}>
              <Link to="/signin">Sign in</Link>
            </StyledButton>
            <StyledButton inverted={false}>
              <Link to="/signup">Sign up!</Link>
            </StyledButton>
          </div>
        </div>
      </StyledCenteredContainer>
    )
  }

  const {basics, ...rest} = authenticatedUser || {}
  console.log(authenticatedUser, 'basics')
  if (!basics) {
    return (
      <StyledCenteredContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2>Let's Start With The Basics</h2>
          </div>
          <fieldset>
            <div className="field-container">
              <StyledInput className="input-container">
                <div>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder={'Name'}
                    name="name"
                    ref={register({
                      required: true,
                      maxLength: 15,
                    })}
                  />
                </div>
              </StyledInput>

              <StyledInput className="input-container">
                <div>
                  <input
                    type="text"
                    placeholder={'Website Url'}
                    name="website"
                    autoComplete="website"
                    ref={register()}
                  />
                </div>
              </StyledInput>

              <StyledInput className="input-container">
                <div>
                  <input
                    type="text"
                    placeholder={'Job Title'}
                    name="label"
                    ref={register()}
                  />
                </div>
              </StyledInput>

              <StyledInput className="input-container">
                <div>
                  <input
                    placeholder={'Current City'}
                    type="text"
                    name="city"
                    ref={register()}
                  />
                </div>
              </StyledInput>
            </div>
            <button type="submit">Update</button>
          </fieldset>
        </StyledForm>
      </StyledCenteredContainer>
    )
  }

  const [main, sidebar] = formatResumeData(rest)
  console.log(rest)
  const config = {}

  return (
    <>
      <div style={{gridArea: 'left'}}>
        {/* <Reparentable id="A">{children.parentA}</Reparentable> */}

        <div>
          <ul>
            <li>Basics</li>
            <li>
              <Form
                id={id}
                module="education"
                initialData={rest.education || {}}
                updateUser={updateUser}
                inputObj={{
                  institution: '',
                  startDate: '',
                  endDate: '',
                  area: '',
                  studyType: '',
                }}
              />
            </li>
            <li>
              <Form
                id={id}
                module="skills"
                initialData={rest.skills || {}}
                updateUser={updateUser}
                inputObj={{
                  level: '',
                  name: '',
                  keywords: [{keyword: ''}],
                }}
              />
            </li>
            <li>Work</li>
            <li>References</li>
            <li>Education</li>
            <li>Awards</li>
          </ul>
        </div>
      </div>
      <div
        style={{
          gridArea: 'content',
          gridTemplateAreas: `'subheader''content'`,
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        }}
      >
        {/* <Reparentable id="B">{children.parentB}</Reparentable> */}
        {basics && <Basics {...basics} layout="" background={'primary'} />}
        <StyledLayout hasSidebar={true}>
          {sidebar && (
            <Sidebar>
              <div>
                <SidebarWrapper>
                  <Profile {...basics} />
                </SidebarWrapper>
                {sidebar && sidebar.length > 0 && (
                  <SidebarWrapper>
                    {sidebar.map(section => {
                      return (
                        <SidebarSection
                          module={section.module}
                          key={section.module}
                        >
                          <Modules
                            module={section.module}
                            order={section.order}
                            content={section.content}
                            slot={section.slot}
                            background={''}
                          />
                        </SidebarSection>
                      )
                    })}
                  </SidebarWrapper>
                )}
              </div>
            </Sidebar>
          )}

          {main && (
            <StyledContentWrapper>
              {main.map((section, index) => {
                return (
                  <StyledMainSection key={section.module}>
                    <Modules
                      module={section.module}
                      order={section.order}
                      content={section.content}
                      slot={section.slot}
                      background={index % 2 === 0 ? 'primary' : 'secondary'}
                    />
                  </StyledMainSection>
                )
              })}
            </StyledContentWrapper>
          )}
        </StyledLayout>
      </div>
    </>
  )
}

// function EducationForm({id, initialData, updateUser, module}) {
//   const [isOpen, setIsOpen] = React.useState(false)

//   const handleClose = e => {
//     e.preventDefault()
//     setIsOpen(!isOpen)
//   }

//   const {content, order, slot} = initialData

//   const {register, control, handleSubmit, reset} = useForm({
//     defaultValues: {
//       education: content || [],
//     },
//   })

//   const {fields, append, remove} = useFieldArray({
//     control,
//     name: module,
//   })

//   const onSubmit = async data => {
//     const {education, order} = data
//     console.log(data)
//     const formatted = education.filter(input => {
//       return Object.values(input).some(prop => prop)
//     })

//     console.log(formatted, order)

//     const mutation = await updateUser({
//       variables: {
//         id,
//         data: {
//           education: {
//             create: {
//               order: parseInt(order),
//               module: 'education',
//               slot: 'main',
//               content: {create: formatted},
//             },
//           },
//         },
//       },
//     })
//     console.log(mutation, 'basic')
//   }

//   return (
//     <div>
//       <div style={{display: 'flex', justifyContent: 'space-between'}}>
//         <h3>Education</h3>
//         <StyledButton
//           style={{height: '4rem', width: '4rem'}}
//           onClick={e => handleClose(e)}
//         >
//           <Chevron direction={isOpen ? 'up' : 'down'} />
//         </StyledButton>
//       </div>

//       {isOpen && (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <label>Order</label>
//           <input name={'order'} defaultValue={order || 1} ref={register()} />
//           <label>slot</label>
//           <input name={'slot'} defaultValue={slot || 'main'} ref={register()} />
//           <ul>
//             {fields.map((item, index) => {
//               return (
//                 <li key={item.id}>
//                   <input
//                     name={`education[${index}].institution`}
//                     defaultValue={`${item.institution}`} // make sure to set up defaultValue
//                     ref={register()}
//                   />
//                   <input
//                     name={`education[${index}].startDate`}
//                     defaultValue={`${item.startDate}`} // make sure to set up defaultValue
//                     ref={register()}
//                   />

//                   <input
//                     name={`education[${index}].endDate`}
//                     defaultValue={`${item.endDate}`} // make sure to set up defaultValue
//                     ref={register()}
//                   />

//                   <input
//                     name={`education[${index}].area`}
//                     defaultValue={`${item.area}`} // make sure to set up defaultValue
//                     ref={register()}
//                   />
//                   <input
//                     name={`education[${index}].studyType`}
//                     defaultValue={`${item.studyType}`} // make sure to set up defaultValue
//                     ref={register()}
//                   />
//                   <button type="button" onClick={() => remove(index)}>
//                     Delete
//                   </button>
//                 </li>
//               )
//             })}
//           </ul>
//           <section>
//             <button
//               type="button"
//               onClick={() => {
//                 append({
//                   institution: '',
//                   startDate: '',
//                   endDate: '',
//                   area: '',
//                   studyType: '',
//                 })
//               }}
//             >
//               append
//             </button>

//             <button
//               type="button"
//               onClick={() =>
//                 reset({
//                   education: content || [],
//                 })
//               }
//             >
//               reset
//             </button>
//           </section>

//           <input type="submit" />
//         </form>
//       )}
//     </div>
//   )
// }
