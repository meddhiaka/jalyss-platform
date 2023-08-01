import React from 'react'

const   TrainingHeading = ({ subtitle, title,mt,mb }) => {
  return (
    <>
    <div id='TrainingHeading'>
      <h3>{subtitle} </h3>
      <h1>{title} </h1>
    </div>
  </>
  )
}

export default TrainingHeading