/* eslint-disable no-undef */
import React from 'react'
import {render} from '@testing-library/react'
import Basics from '../modules/Basics'
import {ThemeProvider} from 'styled-components'
import {theme} from '../util/cssHelpers.js'

const renderComponent = ({
  theme,
  name,
  label,
  image,
  summary,
  email,
  location,
  profiles,
}) =>
  render(
    <ThemeProvider theme={theme}>
      <Basics name={name} location={location} label={label} />
    </ThemeProvider>,
  )

test('renders a div with a title correct module name', () => {
  const {getByTitle} = renderComponent({theme, name: 'basics'})
  const title = getByTitle(/basics/i)
  expect(title).not.toBeNull()
})

test('renders a span with a title=label with correct user description', () => {
  const {getByTitle} = renderComponent({theme, label: 'developer'})
  const title = getByTitle(/label/i)
  expect(title).not.toBeNull()
  expect(title).toHaveTextContent(`I'm a developer`)
})

test('renders a span with a title=location with correct city name', () => {
  const {getByTitle} = renderComponent({theme, location: {city: 'miami'}})
  const title = getByTitle(/location/i)
  expect(title).not.toBeNull()
  expect(title).toHaveTextContent('based in miami')
})
