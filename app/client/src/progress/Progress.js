import React from 'react'
import './Progress.css'

const Progress = (props) => {
  return (
    <div className='progress-bar'>
      <div
        className='progress'
        style={{ width: `${props.progress}%` }}
      />
    </div>
  )
}

export default Progress
