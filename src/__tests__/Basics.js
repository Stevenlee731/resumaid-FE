/* eslint-disable no-undef */
import React from 'react'
import {render} from '@testing-library/react'
import Basics from '../modules/Basics'

test('renders a div with a title=name with textContent', () => {
  const {getByTitle} = render(<Basics name={'test name'} />)
  const title = getByTitle(/name/i)
  expect(title).toHaveTextContent('test name')
})
