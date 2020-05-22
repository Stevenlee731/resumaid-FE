import React from 'react'
import Header from '../components/Header'
import {Link} from 'react-router-dom'
import StyledHome from '../styles/StyledHome'
import {StyledButton} from '../styles/Components'

export default function Home(): JSX.Element {
  return (
    <StyledHome>
      <div className="hero">
        <h2 className="header">
          <span className="text-primary">Leave a great</span>
          <span className="text-secondary">(digital) impression</span>
        </h2>
        <p className="subheader">Create a free online portfolio in minutes!</p>
        <div className="button-group">
          <StyledButton inverted={false}>
            <Link to="/signup">Get Started</Link>
          </StyledButton>
          <StyledButton inverted={true}>
            <Link to="/signin">Sign in!</Link>
          </StyledButton>
        </div>
      </div>
    </StyledHome>
  )
}
