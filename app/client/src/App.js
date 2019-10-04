import React from 'react'
import Header from './header'
import './App.css'
import Upload from './upload'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <div className='main'>
        <div className='card'>
          <Upload />
        </div>
      </div>
    </div>
  )
}

export default App
