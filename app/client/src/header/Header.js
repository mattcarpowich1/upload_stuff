import React from 'react'
import baby from './image/pink-baby.svg'
import './Header.css'

const Header = () => (
  <div className='header'>
    <img src={baby} alt='baby' />
    <h1>babydrop</h1>
  </div>
)

export default Header