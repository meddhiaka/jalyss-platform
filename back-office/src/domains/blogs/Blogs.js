import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Blogs() {
  return (
    <div className='page'>
      
        <Outlet/>
    </div>
  )
}

export default Blogs