import React from 'react'
import Header from '../components/Header'
import StyledHome from '../styles/StyledHome'

type HomeProps = {
  isDark: boolean
  handleTheme: Function
}

export default function Home({isDark, handleTheme}: HomeProps): JSX.Element {
  return (
    <>
      <Header handleTheme={handleTheme} isDark={isDark} />
      <StyledHome>Home</StyledHome>
    </>
  )
}
