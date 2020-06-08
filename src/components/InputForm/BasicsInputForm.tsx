import * as React from 'react'
import {
  StyledCenteredContainer,
  StyledForm,
  StyledInput,
} from '../../styles/Components'

const BasicsInputForm = ({
  handleSubmit,
  onSubmit,
  register,
}: {
  handleSubmit: any
  onSubmit: any
  register: any
}) => {
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

export default BasicsInputForm
